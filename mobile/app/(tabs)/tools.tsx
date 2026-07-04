import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { useThemeColors } from "../../src/hooks/useThemeColor";
import { Spacing, FontSize, BorderRadius } from "../../src/constants/theme";

const tools = [
  { icon: "document-text" as const, title: "Agreement", desc: "Generate rental agreements", colors: ["#4f46e5", "#6366f1"] as [string, string] },
  { icon: "checkbox" as const, title: "Checklist", desc: "Moving day checklist", colors: ["#059669", "#34d399"] as [string, string] },
  { icon: "calculator" as const, title: "Deposit Calc", desc: "Calculate deposit + EMI", colors: ["#7c3aed", "#a78bfa"] as [string, string] },
  { icon: "calendar" as const, title: "Move Planner", desc: "Plan your move", colors: ["#ea580c", "#fb923c"] as [string, string] },
  { icon: "receipt" as const, title: "Rent Receipt", desc: "HRA-compliant receipts", colors: ["#db2777", "#f472b6"] as [string, string] },
  { icon: "construct" as const, title: "Maintenance", desc: "Submit requests", colors: ["#0891b2", "#22d3ee"] as [string, string] },
];

export default function ToolsScreen() {
  const colors = useThemeColors();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top"]}>
      <Animated.ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <Text style={[styles.title, { color: colors.text }]}>Tools</Text>
        </View>

        {/* Grid */}
        <View style={styles.grid}>
          {tools.map((tool, i) => (
            <Animated.View key={tool.title} entering={FadeInDown.delay(i * 60).springify().damping(16)} style={styles.gridItem}>
              <Pressable
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  Alert.alert(tool.title, `${tool.desc} — coming soon!`);
                }}
                style={({ pressed }) => [
                  styles.toolCard,
                  { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.8 : 1, transform: [{ scale: pressed ? 0.97 : 1 }] },
                ]}
              >
                <LinearGradient colors={tool.colors} style={styles.toolIcon} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                  <Ionicons name={tool.icon} size={24} color="#fff" />
                </LinearGradient>
                <Text style={[styles.toolTitle, { color: colors.text }]}>{tool.title}</Text>
                <Text style={[styles.toolDesc, { color: colors.textMuted }]}>{tool.desc}</Text>
              </Pressable>
            </Animated.View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Calculate</Text>
          {[
            { icon: "wallet-outline" as const, label: "Rent Affordability" },
            { icon: "document-outline" as const, label: "Stamp Duty" },
            { icon: "trending-up-outline" as const, label: "EMI Calculator" },
          ].map((item, i) => (
            <Animated.View key={item.label} entering={FadeInDown.delay(400 + i * 60)}>
              <Pressable
                onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
                style={({ pressed }) => [
                  styles.quickRow,
                  { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.85 : 1 },
                ]}
              >
                <View style={[styles.quickIcon, { backgroundColor: colors.primaryLight }]}>
                  <Ionicons name={item.icon} size={20} color={colors.primary} />
                </View>
                <Text style={[styles.quickLabel, { color: colors.text }]}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
              </Pressable>
            </Animated.View>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingHorizontal: Spacing.base },
  header: { paddingVertical: 14, borderBottomWidth: 0.5 },
  title: { fontSize: 28, fontWeight: "800", letterSpacing: -0.5 },

  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 20, marginBottom: 28 },
  gridItem: { width: "47%" },
  toolCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    minHeight: 140,
    justifyContent: "flex-end",
  },
  toolIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  toolTitle: { fontSize: 15, fontWeight: "800", marginBottom: 3 },
  toolDesc: { fontSize: 12, lineHeight: 16 },

  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: "800", marginBottom: 12, letterSpacing: -0.2 },
  quickRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 8,
  },
  quickIcon: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  quickLabel: { flex: 1, fontSize: 15, fontWeight: "600" },
});
