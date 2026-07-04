import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { useThemeColors } from "../src/hooks/useThemeColor";
import { Spacing } from "../src/constants/theme";

const modules = [
  { name: "RentalBrain™", desc: "AI matching engine — 100+ signals for intelligent recommendations", icon: "sparkles" as const, color: "#4f46e5" },
  { name: "TrustShield™", desc: "Dual-sided verification for landlords and tenants", icon: "shield-checkmark" as const, color: "#059669" },
  { name: "RentIQ™", desc: "AI pricing intelligence — 50+ variables for fair market rent", icon: "analytics" as const, color: "#f59e0b" },
  { name: "RentalOS™", desc: "Post-lease operating system — rent tracking, maintenance, renewals", icon: "grid" as const, color: "#7c3aed" },
  { name: "CityFit™", desc: "Neighborhood intelligence — walk score, safety, commute analysis", icon: "compass" as const, color: "#06b6d4" },
];

const stats = [
  { value: "500+", label: "Verified Listings" },
  { value: "31+", label: "Property Types" },
  { value: "8", label: "Neighborhoods" },
  { value: "5", label: "AI Modules" },
];

export default function AboutScreen() {
  const colors = useThemeColors();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top"]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>About</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <LinearGradient colors={["#4f46e5", "#7c3aed"]} style={styles.hero}>
          <Ionicons name="home" size={48} color="rgba(255,255,255,0.2)" />
          <Text style={styles.heroTitle}>99tolet</Text>
          <Text style={styles.heroSub}>India's AI Leasing OS</Text>
          <Text style={styles.heroDesc}>From vacancy to verified occupancy. AI matching, trust verification, and full lifecycle rental operations.</Text>
        </LinearGradient>

        {/* Stats */}
        <View style={[styles.statsRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {stats.map((s) => (
            <View key={s.label} style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.primary }]}>{s.value}</Text>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Platform modules */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Our Platform</Text>
        {modules.map((mod, i) => (
          <Animated.View key={mod.name} entering={FadeInDown.delay(i * 60).springify().damping(16)}>
            <View style={[styles.moduleCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={[styles.moduleIcon, { backgroundColor: mod.color + "15" }]}>
                <Ionicons name={mod.icon} size={22} color={mod.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.moduleName, { color: colors.text }]}>{mod.name}</Text>
                <Text style={[styles.moduleDesc, { color: colors.textMuted }]}>{mod.desc}</Text>
              </View>
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
  hero: { borderRadius: 20, padding: 24, alignItems: "center", gap: 8, marginBottom: 16 },
  heroTitle: { fontSize: 32, fontWeight: "800", color: "#fff", letterSpacing: -0.5 },
  heroSub: { fontSize: 14, fontWeight: "600", color: "rgba(255,255,255,0.8)" },
  heroDesc: { fontSize: 13, color: "rgba(255,255,255,0.7)", textAlign: "center", lineHeight: 20, marginTop: 4 },
  statsRow: { flexDirection: "row", borderRadius: 16, borderWidth: 1, paddingVertical: 16, marginBottom: 24 },
  statItem: { flex: 1, alignItems: "center" },
  statValue: { fontSize: 22, fontWeight: "800" },
  statLabel: { fontSize: 10, fontWeight: "500", marginTop: 2 },
  sectionTitle: { fontSize: 20, fontWeight: "800", marginBottom: 14, letterSpacing: -0.3 },
  moduleCard: { flexDirection: "row", alignItems: "center", gap: 14, padding: 16, borderRadius: 16, borderWidth: 1, marginBottom: 10 },
  moduleIcon: { width: 48, height: 48, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  moduleName: { fontSize: 15, fontWeight: "800" },
  moduleDesc: { fontSize: 12, lineHeight: 18, marginTop: 2 },
});
