import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { useThemeColors } from "../src/hooks/useThemeColor";
import { blogPosts } from "../src/data/blog";
import { Spacing, FontSize, BorderRadius } from "../src/constants/theme";

export default function BlogScreen() {
  const colors = useThemeColors();
  const router = useRouter();
  const featured = blogPosts.filter((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top"]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]}>Blog & Insights</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={blogPosts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInDown.delay(index * 60).springify().damping(16)}>
            <Pressable
              onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); Alert.alert(item.title, item.excerpt); }}
              style={({ pressed }) => [
                styles.card,
                { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.85 : 1 },
              ]}
            >
              {item.featured && (
                <View style={[styles.featuredBadge, { backgroundColor: colors.primaryLight }]}>
                  <Text style={[styles.featuredText, { color: colors.primary }]}>FEATURED</Text>
                </View>
              )}
              <View style={[styles.categoryBadge, { backgroundColor: colors.surface }]}>
                <Text style={[styles.categoryText, { color: colors.primary }]}>{item.category}</Text>
              </View>
              <Text style={[styles.cardTitle, { color: colors.text }]} numberOfLines={2}>{item.title}</Text>
              <Text style={[styles.cardExcerpt, { color: colors.textMuted }]} numberOfLines={2}>{item.excerpt}</Text>
              <View style={styles.cardMeta}>
                <Text style={[styles.metaText, { color: colors.textMuted }]}>{item.author.name}</Text>
                <Text style={[styles.metaDot, { color: colors.textMuted }]}>·</Text>
                <Text style={[styles.metaText, { color: colors.textMuted }]}>{item.readTime}</Text>
              </View>
            </Pressable>
          </Animated.View>
        )}
      />
    </SafeAreaView>
  );
}

import { Alert } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: Spacing.base, paddingVertical: 14, borderBottomWidth: 0.5 },
  title: { fontSize: 18, fontWeight: "700" },
  list: { paddingHorizontal: Spacing.base, paddingTop: 16, paddingBottom: 100, gap: 14 },
  card: { borderRadius: 16, borderWidth: 1, padding: 16 },
  featuredBadge: { alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, marginBottom: 8 },
  featuredText: { fontSize: 9, fontWeight: "800", letterSpacing: 0.8 },
  categoryBadge: { alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginBottom: 10 },
  categoryText: { fontSize: 11, fontWeight: "700" },
  cardTitle: { fontSize: 17, fontWeight: "800", lineHeight: 24, marginBottom: 6 },
  cardExcerpt: { fontSize: 13, lineHeight: 20, marginBottom: 10 },
  cardMeta: { flexDirection: "row", alignItems: "center" },
  metaText: { fontSize: 12 },
  metaDot: { marginHorizontal: 6, fontSize: 12 },
});
