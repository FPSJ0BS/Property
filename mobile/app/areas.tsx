import { View, Text, Pressable, StyleSheet, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { useThemeColors } from "../src/hooks/useThemeColor";
import { areas } from "../src/data/areas";
import { Spacing } from "../src/constants/theme";
import { formatPrice } from "../src/utils/format";

export default function AreasScreen() {
  const colors = useThemeColors();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top"]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Neighborhoods</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Explore {areas.length} neighborhoods in Jaipur with AI-powered CityFit™ scores
        </Text>

        {areas.map((area, i) => (
          <Animated.View key={area.id} entering={FadeInDown.delay(i * 50).springify().damping(16)}>
            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                Alert.alert(area.name, `${area.tagline}\n\n${area.description}`);
              }}
              style={({ pressed }) => [
                styles.areaCard,
                { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.9 : 1 },
              ]}
            >
              <View style={styles.areaHeader}>
                <View>
                  <Text style={[styles.areaName, { color: colors.text }]}>{area.name}</Text>
                  <Text style={[styles.areaTagline, { color: colors.textMuted }]} numberOfLines={1}>{area.tagline}</Text>
                </View>
                <View style={[styles.demandBadge, {
                  backgroundColor: area.demand === "Very High" ? "#fef2f2" : area.demand === "High" ? "#fffbeb" : area.demand === "Emerging" ? "#ecfdf5" : colors.surface,
                }]}>
                  <Text style={[styles.demandText, {
                    color: area.demand === "Very High" ? "#dc2626" : area.demand === "High" ? "#f59e0b" : area.demand === "Emerging" ? "#059669" : colors.textMuted,
                  }]}>{area.demand}</Text>
                </View>
              </View>

              {/* Scores */}
              <View style={styles.scoresRow}>
                {[
                  { label: "Walk", value: area.walkScore, icon: "walk" as const },
                  { label: "Safety", value: area.safetyScore, icon: "shield" as const },
                  { label: "Transit", value: area.transitScore, icon: "bus" as const },
                  { label: "Family", value: area.familyScore, icon: "people" as const },
                ].map((score) => (
                  <View key={score.label} style={styles.scoreItem}>
                    <Ionicons name={score.icon} size={14} color={colors.primary} />
                    <Text style={[styles.scoreValue, { color: colors.text }]}>{score.value}</Text>
                    <Text style={[styles.scoreLabel, { color: colors.textMuted }]}>{score.label}</Text>
                  </View>
                ))}
              </View>

              {/* Rent range + best for */}
              <View style={styles.areaFooter}>
                <Text style={[styles.rentRange, { color: colors.textSecondary }]}>
                  {formatPrice(area.rentRange.min)} – {formatPrice(area.rentRange.max)}
                </Text>
                <View style={styles.bestForRow}>
                  {area.bestFor.slice(0, 2).map((tag) => (
                    <View key={tag} style={[styles.bestForChip, { backgroundColor: colors.primaryLight }]}>
                      <Text style={[styles.bestForText, { color: colors.primary }]}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </Pressable>
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
  scroll: { paddingHorizontal: Spacing.base, paddingTop: 8 },
  subtitle: { fontSize: 13, lineHeight: 20, marginBottom: 16 },
  areaCard: { borderRadius: 18, borderWidth: 1, padding: 16, marginBottom: 12 },
  areaHeader: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 },
  areaName: { fontSize: 18, fontWeight: "800" },
  areaTagline: { fontSize: 12, marginTop: 2, maxWidth: 220 },
  demandBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  demandText: { fontSize: 10, fontWeight: "700" },
  scoresRow: { flexDirection: "row", gap: 6, marginBottom: 12 },
  scoreItem: { flex: 1, alignItems: "center", gap: 2, paddingVertical: 8, borderRadius: 10, backgroundColor: "rgba(99,102,241,0.04)" },
  scoreValue: { fontSize: 16, fontWeight: "800" },
  scoreLabel: { fontSize: 9, fontWeight: "500" },
  areaFooter: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  rentRange: { fontSize: 13, fontWeight: "600" },
  bestForRow: { flexDirection: "row", gap: 4 },
  bestForChip: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  bestForText: { fontSize: 10, fontWeight: "600" },
});
