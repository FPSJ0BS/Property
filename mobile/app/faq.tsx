import { useState } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown, Layout } from "react-native-reanimated";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { useThemeColors } from "../src/hooks/useThemeColor";
import { faqs } from "../src/data/faqs";
import { Spacing } from "../src/constants/theme";

export default function FAQScreen() {
  const colors = useThemeColors();
  const router = useRouter();
  const [openId, setOpenId] = useState<string | null>(null);

  const grouped = faqs.reduce<Record<string, typeof faqs>>((acc, faq) => {
    (acc[faq.category] ??= []).push(faq);
    return acc;
  }, {});

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top"]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>FAQ</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {Object.entries(grouped).map(([category, items], ci) => (
          <Animated.View key={category} entering={FadeInDown.delay(ci * 80).springify().damping(16)} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>{category.toUpperCase()}</Text>
            <View style={[styles.group, { backgroundColor: colors.card, borderColor: colors.border }]}>
              {items.map((faq, i) => {
                const isOpen = openId === faq.id;
                return (
                  <Pressable
                    key={faq.id}
                    onPress={() => { Haptics.selectionAsync(); setOpenId(isOpen ? null : faq.id); }}
                    style={[styles.faqRow, i < items.length - 1 && { borderBottomWidth: 0.5, borderBottomColor: colors.border }]}
                  >
                    <View style={styles.faqHeader}>
                      <Text style={[styles.faqQuestion, { color: colors.text }]}>{faq.question}</Text>
                      <Ionicons name={isOpen ? "chevron-up" : "chevron-down"} size={18} color={colors.textMuted} />
                    </View>
                    {isOpen && (
                      <Text style={[styles.faqAnswer, { color: colors.textSecondary }]}>{faq.answer}</Text>
                    )}
                  </Pressable>
                );
              })}
            </View>
          </Animated.View>
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: Spacing.base, paddingVertical: 14, borderBottomWidth: 0.5 },
  headerTitle: { fontSize: 18, fontWeight: "700" },
  scroll: { paddingHorizontal: Spacing.base, paddingTop: 16 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 11, fontWeight: "700", letterSpacing: 0.8, marginBottom: 8, paddingLeft: 4 },
  group: { borderRadius: 14, borderWidth: 1, overflow: "hidden" },
  faqRow: { paddingHorizontal: 16, paddingVertical: 14 },
  faqHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 },
  faqQuestion: { flex: 1, fontSize: 14, fontWeight: "600", lineHeight: 20 },
  faqAnswer: { fontSize: 13, lineHeight: 20, marginTop: 10 },
});
