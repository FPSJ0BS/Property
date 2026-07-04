import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { useThemeColors } from "../src/hooks/useThemeColor";
import { plans } from "../src/data/plans";
import { Spacing } from "../src/constants/theme";

export default function PricingScreen() {
  const colors = useThemeColors();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top"]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Pricing</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {plans.map((plan, i) => (
          <Animated.View key={plan.id} entering={FadeInDown.delay(i * 60).springify().damping(16)}>
            <View style={[styles.planCard, { backgroundColor: colors.card, borderColor: plan.highlighted ? colors.primary : colors.border, borderWidth: plan.highlighted ? 2 : 1 }]}>
              {plan.highlighted && (
                <LinearGradient colors={["#4f46e5", "#7c3aed"]} style={styles.popularBadge}>
                  <Text style={styles.popularText}>MOST POPULAR</Text>
                </LinearGradient>
              )}
              <Text style={[styles.planName, { color: colors.text }]}>{plan.name}</Text>
              <Text style={[styles.planAudience, { color: colors.textMuted }]}>{plan.audience}</Text>
              <View style={styles.priceRow}>
                <Text style={[styles.planPrice, { color: colors.primary }]}>{plan.price}</Text>
                {plan.period && <Text style={[styles.planPeriod, { color: colors.textMuted }]}>/{plan.period}</Text>}
              </View>
              <View style={styles.features}>
                {plan.features.map((f) => (
                  <View key={f} style={styles.featureRow}>
                    <Ionicons name="checkmark-circle" size={16} color={colors.success} />
                    <Text style={[styles.featureText, { color: colors.textSecondary }]}>{f}</Text>
                  </View>
                ))}
              </View>
              <Pressable onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
                {plan.highlighted ? (
                  <LinearGradient colors={["#4f46e5", "#7c3aed"]} style={styles.ctaBtn}>
                    <Text style={styles.ctaBtnText}>{plan.cta}</Text>
                  </LinearGradient>
                ) : (
                  <View style={[styles.ctaBtnOutline, { borderColor: colors.primary }]}>
                    <Text style={[styles.ctaBtnOutlineText, { color: colors.primary }]}>{plan.cta}</Text>
                  </View>
                )}
              </Pressable>
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
  scroll: { paddingHorizontal: Spacing.base, paddingTop: 16, gap: 16 },
  planCard: { borderRadius: 18, padding: 20, position: "relative", overflow: "hidden" },
  popularBadge: { position: "absolute", top: 0, right: 0, paddingHorizontal: 12, paddingVertical: 5, borderBottomLeftRadius: 12 },
  popularText: { color: "#fff", fontSize: 9, fontWeight: "800", letterSpacing: 0.8 },
  planName: { fontSize: 20, fontWeight: "800" },
  planAudience: { fontSize: 13, marginTop: 2, marginBottom: 12 },
  priceRow: { flexDirection: "row", alignItems: "baseline", gap: 2, marginBottom: 16 },
  planPrice: { fontSize: 28, fontWeight: "800" },
  planPeriod: { fontSize: 14 },
  features: { gap: 8, marginBottom: 16 },
  featureRow: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  featureText: { fontSize: 13, flex: 1, lineHeight: 18 },
  ctaBtn: { height: 48, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  ctaBtnText: { color: "#fff", fontSize: 15, fontWeight: "700" },
  ctaBtnOutline: { height: 48, borderRadius: 12, borderWidth: 1.5, alignItems: "center", justifyContent: "center" },
  ctaBtnOutlineText: { fontSize: 15, fontWeight: "700" },
});
