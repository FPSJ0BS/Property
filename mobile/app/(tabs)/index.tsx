import { useRef } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { useThemeColors } from "../../src/hooks/useThemeColor";
import { properties } from "../../src/data/properties";
import { Spacing, FontSize } from "../../src/constants/theme";
import PropertyCard from "../../src/components/PropertyCard";

const { width } = Dimensions.get("window");

const HEADER_MAX = 120;
const HEADER_MIN = 60;

const categoryIcons = [
  { key: "all", icon: "apps" as const, label: "All" },
  { key: "residential", icon: "home" as const, label: "Homes" },
  { key: "commercial", icon: "business" as const, label: "Office" },
  { key: "co-living", icon: "people" as const, label: "Co-Live" },
  { key: "co-working", icon: "laptop" as const, label: "Co-Work" },
  { key: "studio", icon: "cube" as const, label: "Studio" },
];

export default function HomeScreen() {
  const colors = useThemeColors();
  const router = useRouter();
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // Collapsing header title animation
  const titleStyle = useAnimatedStyle(() => ({
    fontSize: interpolate(scrollY.value, [0, 80], [28, 20], Extrapolation.CLAMP),
    opacity: interpolate(scrollY.value, [0, 60], [1, 0.9], Extrapolation.CLAMP),
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 50], [1, 0], Extrapolation.CLAMP),
    height: interpolate(scrollY.value, [0, 50], [20, 0], Extrapolation.CLAMP),
  }));

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top"]}>
      {/* ── Sticky Header ── */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <View>
          <Animated.Text style={[styles.headerTitle, { color: colors.text }, titleStyle]}>
            Explore
          </Animated.Text>
          <Animated.Text style={[styles.headerSubtitle, { color: colors.textMuted }, subtitleStyle]}>
            Jaipur, Rajasthan
          </Animated.Text>
        </View>
        <View style={styles.headerActions}>
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              router.push("/(tabs)/discover");
            }}
            style={[styles.headerBtn, { backgroundColor: colors.surface }]}
          >
            <Ionicons name="search" size={19} color={colors.text} />
          </Pressable>
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            style={[styles.headerBtn, { backgroundColor: colors.surface }]}
          >
            <Ionicons name="notifications-outline" size={19} color={colors.text} />
            <View style={styles.notifDot} />
          </Pressable>
        </View>
      </View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* ── Search Bar (tappable, opens Discover) ── */}
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.push("/(tabs)/discover");
          }}
          style={[styles.searchBar, { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
          <Ionicons name="search" size={18} color={colors.textMuted} />
          <Text style={[styles.searchPlaceholder, { color: colors.textMuted }]}>
            Where do you want to live?
          </Text>
          <View style={[styles.searchFilter, { backgroundColor: colors.primaryLight }]}>
            <Ionicons name="options" size={16} color={colors.primary} />
          </View>
        </Pressable>

        {/* ── Categories (icon row like Airbnb) ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        >
          {categoryIcons.map((cat, i) => (
            <Pressable
              key={cat.key}
              onPress={() => {
                Haptics.selectionAsync();
                router.push("/(tabs)/discover");
              }}
              style={styles.categoryItem}
            >
              <View
                style={[
                  styles.categoryIcon,
                  {
                    backgroundColor: i === 0 ? colors.primary : colors.surface,
                    borderColor: i === 0 ? colors.primary : colors.border,
                  },
                ]}
              >
                <Ionicons
                  name={cat.icon}
                  size={20}
                  color={i === 0 ? "#fff" : colors.textSecondary}
                />
              </View>
              <Text
                style={[
                  styles.categoryLabel,
                  { color: i === 0 ? colors.primary : colors.textMuted, fontWeight: i === 0 ? "700" : "500" },
                ]}
              >
                {cat.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* ── Nearby / Feed Label ── */}
        <View style={styles.feedHeader}>
          <Text style={[styles.feedTitle, { color: colors.text }]}>Nearby you</Text>
          <Pressable onPress={() => router.push("/(tabs)/discover")}>
            <Text style={[styles.showMap, { color: colors.primary }]}>
              Show map
            </Text>
          </Pressable>
        </View>

        {/* ── Property Feed (full-width cards) ── */}
        {properties.map((p, i) => (
          <PropertyCard key={p.id} property={p} index={i} />
        ))}

        <View style={{ height: 40 }} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.base,
    paddingBottom: 8,
    borderBottomWidth: 0.5,
  },
  headerTitle: {
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    fontWeight: "500",
    marginTop: 1,
  },
  headerActions: {
    flexDirection: "row",
    gap: 8,
    paddingBottom: 4,
  },
  headerBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  notifDot: {
    position: "absolute",
    top: 8,
    right: 9,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#ef4444",
    borderWidth: 1.5,
    borderColor: "#fff",
  },

  scroll: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.md,
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    paddingLeft: 16,
    paddingRight: 6,
    gap: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: { elevation: 2 },
    }),
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
  },
  searchFilter: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  categories: {
    gap: 16,
    paddingVertical: 20,
    paddingRight: 16,
  },
  categoryItem: {
    alignItems: "center",
    gap: 6,
  },
  categoryIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryLabel: {
    fontSize: 11,
  },

  feedHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  feedTitle: {
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  showMap: {
    fontSize: 13,
    fontWeight: "700",
  },
});
