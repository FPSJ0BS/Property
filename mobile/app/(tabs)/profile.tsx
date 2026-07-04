import { View, Text, Pressable, StyleSheet, Alert, Platform } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useThemeColors } from "../../src/hooks/useThemeColor";
import { useStore } from "../../src/store/useStore";
import { Spacing, FontSize, BorderRadius } from "../../src/constants/theme";

interface MenuRow {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  trailing?: string;
  danger?: boolean;
  route?: string;
}

const sections: { title: string; rows: MenuRow[] }[] = [
  {
    title: "EXPLORE",
    rows: [
      { icon: "map-outline", label: "Neighborhoods", route: "/areas" },
      { icon: "newspaper-outline", label: "Blog & Insights", route: "/blog" },
      { icon: "pricetag-outline", label: "Pricing Plans", route: "/pricing" },
      { icon: "help-circle-outline", label: "FAQ", route: "/faq" },
    ],
  },
  {
    title: "ACCOUNT",
    rows: [
      { icon: "person-outline", label: "Edit Profile" },
      { icon: "notifications-outline", label: "Notifications", trailing: "3" },
      { icon: "shield-checkmark-outline", label: "Verification" },
      { icon: "card-outline", label: "Payments" },
    ],
  },
  {
    title: "PREFERENCES",
    rows: [
      { icon: "location-outline", label: "City", trailing: "Jaipur" },
      { icon: "options-outline", label: "Search Preferences" },
      { icon: "moon-outline", label: "Appearance", trailing: "System" },
      { icon: "language-outline", label: "Language", trailing: "English" },
    ],
  },
  {
    title: "ABOUT",
    rows: [
      { icon: "information-circle-outline", label: "About 99tolet", route: "/about" },
      { icon: "call-outline", label: "Contact Us", route: "/contact" },
      { icon: "star-outline", label: "Rate 99tolet" },
      { icon: "share-outline", label: "Tell a friend" },
    ],
  },
  {
    title: "",
    rows: [
      { icon: "log-out-outline", label: "Sign Out", danger: true },
    ],
  },
];

export default function ProfileScreen() {
  const colors = useThemeColors();
  const router = useRouter();
  const { savedIds, recentIds } = useStore();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top"]}>
      <Animated.ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
        </View>

        {/* Profile Card */}
        <Animated.View entering={FadeInDown.springify().damping(16)} style={{ paddingHorizontal: Spacing.base, paddingTop: 16 }}>
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              router.push("/login");
            }}
            style={({ pressed }) => [styles.profileCard, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.9 : 1 }]}
          >
            <LinearGradient colors={["#4f46e5", "#7c3aed"]} style={styles.avatar}>
              <Ionicons name="person" size={26} color="#fff" />
            </LinearGradient>
            <View style={{ flex: 1 }}>
              <Text style={[styles.profileTitle, { color: colors.text }]}>Sign in</Text>
              <Text style={[styles.profileSub, { color: colors.textMuted }]}>Get personalized recommendations</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </Pressable>
        </Animated.View>

        {/* Stats */}
        <Animated.View entering={FadeInDown.delay(100).springify().damping(16)} style={styles.statsWrap}>
          {[
            { value: String(savedIds.length), label: "Saved", icon: "heart" as const },
            { value: String(recentIds.length), label: "Viewed", icon: "eye" as const },
            { value: "0", label: "Tours", icon: "calendar" as const },
          ].map((stat, i) => (
            <View key={stat.label} style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Ionicons name={stat.icon} size={18} color={colors.primary} />
              <Text style={[styles.statVal, { color: colors.text }]}>{stat.value}</Text>
              <Text style={[styles.statLbl, { color: colors.textMuted }]}>{stat.label}</Text>
            </View>
          ))}
        </Animated.View>

        {/* Menu sections (iOS Settings-style grouped list) */}
        {sections.map((section, si) => (
          <Animated.View
            key={section.title || "signout"}
            entering={FadeInDown.delay(200 + si * 80).springify().damping(16)}
            style={styles.menuSection}
          >
            {section.title ? (
              <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>{section.title}</Text>
            ) : null}
            <View style={[styles.menuGroup, { backgroundColor: colors.card, borderColor: colors.border }]}>
              {section.rows.map((row, ri) => (
                <Pressable
                  key={row.label}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    if (row.route) {
                      router.push(row.route as any);
                      return;
                    }
                    if (row.danger) {
                      Alert.alert("Sign Out", "Are you sure?", [
                        { text: "Cancel", style: "cancel" },
                        { text: "Sign Out", style: "destructive" },
                      ]);
                    }
                  }}
                  style={({ pressed }) => [
                    styles.menuRow,
                    ri < section.rows.length - 1 && { borderBottomWidth: 0.5, borderBottomColor: colors.border },
                    { opacity: pressed ? 0.7 : 1 },
                  ]}
                >
                  <Ionicons
                    name={row.icon}
                    size={20}
                    color={row.danger ? "#ef4444" : colors.textSecondary}
                  />
                  <Text
                    style={[
                      styles.menuLabel,
                      { color: row.danger ? "#ef4444" : colors.text },
                    ]}
                  >
                    {row.label}
                  </Text>
                  {row.trailing && !row.danger && (
                    <Text style={[styles.menuTrailing, { color: colors.textMuted }]}>{row.trailing}</Text>
                  )}
                  {!row.danger && (
                    <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
                  )}
                </Pressable>
              ))}
            </View>
          </Animated.View>
        ))}

        {/* Version */}
        <Text style={[styles.version, { color: colors.textMuted }]}>99tolet v1.0.0</Text>
        <View style={{ height: 40 }} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: Spacing.base, paddingVertical: 14, borderBottomWidth: 0.5 },
  title: { fontSize: 28, fontWeight: "800", letterSpacing: -0.5 },

  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
  },
  avatar: { width: 52, height: 52, borderRadius: 26, alignItems: "center", justifyContent: "center" },
  profileTitle: { fontSize: 17, fontWeight: "800" },
  profileSub: { fontSize: 13, marginTop: 2 },

  statsWrap: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: Spacing.base,
    paddingTop: 16,
    paddingBottom: 8,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    gap: 4,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  statVal: { fontSize: 20, fontWeight: "800" },
  statLbl: { fontSize: 11, fontWeight: "500" },

  menuSection: { paddingHorizontal: Spacing.base, paddingTop: 20 },
  sectionLabel: { fontSize: 12, fontWeight: "700", letterSpacing: 0.8, marginBottom: 8, paddingLeft: 4 },
  menuGroup: { borderRadius: 14, borderWidth: 1, overflow: "hidden" },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 14,
    minHeight: 48,
  },
  menuLabel: { flex: 1, fontSize: 15, fontWeight: "500" },
  menuTrailing: { fontSize: 14 },

  version: { textAlign: "center", fontSize: 12, paddingTop: 24 },
});
