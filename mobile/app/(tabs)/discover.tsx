import { useState, useMemo, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Platform,
  Keyboard,
} from "react-native";
import Animated, {
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useThemeColors } from "../../src/hooks/useThemeColor";
import { properties, categories, subTypes, listingTypes } from "../../src/data/properties";
import { Spacing, FontSize, BorderRadius } from "../../src/constants/theme";
import PropertyCard from "../../src/components/PropertyCard";

export default function DiscoverScreen() {
  const colors = useThemeColors();
  const inputRef = useRef<TextInput>(null);
  const [search, setSearch] = useState("");
  const [listingType, setListingType] = useState("Rent");
  const [category, setCategory] = useState("all");
  const [subType, setSubType] = useState("All");
  const [sortBy, setSortBy] = useState("match");
  const [focused, setFocused] = useState(false);
  const scrollY = useSharedValue(0);

  const currentSubTypes = category !== "all" ? subTypes[category] ?? [] : [];

  const filtered = useMemo(() => {
    let result = [...properties];

    // Filter by listing type
    result = result.filter((p) => p.listingType === listingType);

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.locality.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.subType.toLowerCase().includes(q)
      );
    }

    if (category !== "all") result = result.filter((p) => p.type === category);
    if (subType !== "All") result = result.filter((p) => p.subType === subType);

    switch (sortBy) {
      case "match": result.sort((a, b) => b.aiMatchScore - a.aiMatchScore); break;
      case "price-low": result.sort((a, b) => a.price - b.price); break;
      case "price-high": result.sort((a, b) => b.price - a.price); break;
      case "newest": result.sort((a, b) => +new Date(b.postedDate) - +new Date(a.postedDate)); break;
      case "trust": result.sort((a, b) => b.trustScore - a.trustScore); break;
    }
    return result;
  }, [search, listingType, category, subType, sortBy]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => { scrollY.value = e.contentOffset.y; },
  });

  const headerShadow = useAnimatedStyle(() => ({
    shadowOpacity: interpolate(scrollY.value, [0, 30], [0, 0.08], Extrapolation.CLAMP),
    elevation: interpolate(scrollY.value, [0, 30], [0, 3], Extrapolation.CLAMP),
  }));

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top"]}>
      {/* ── Sticky Search Header ── */}
      <Animated.View style={[styles.searchHeader, { backgroundColor: colors.background }, headerShadow]}>
        {/* Search bar */}
        <View style={[styles.searchBar, { backgroundColor: colors.surface, borderColor: focused ? colors.primary : colors.border }]}>
          <Ionicons name="search" size={18} color={focused ? colors.primary : colors.textMuted} />
          <TextInput
            ref={inputRef}
            value={search}
            onChangeText={setSearch}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search by area, city, type..."
            placeholderTextColor={colors.textMuted}
            style={[styles.searchInput, { color: colors.text }]}
            returnKeyType="search"
            autoCorrect={false}
          />
          {search.length > 0 && (
            <Pressable onPress={() => { setSearch(""); Haptics.selectionAsync(); }} hitSlop={10}>
              <Ionicons name="close-circle" size={18} color={colors.textMuted} />
            </Pressable>
          )}
          {focused && (
            <Pressable onPress={() => { Keyboard.dismiss(); setFocused(false); }} style={styles.cancelBtn}>
              <Text style={[styles.cancelText, { color: colors.primary }]}>Cancel</Text>
            </Pressable>
          )}
        </View>

        {/* Listing type tabs (Rent / Buy / Lease) */}
        <View style={styles.listingTabs}>
          {listingTypes.map((lt) => {
            const active = listingType === lt;
            return (
              <Pressable
                key={lt}
                onPress={() => { Haptics.selectionAsync(); setListingType(lt); setCategory("all"); setSubType("All"); }}
                style={[styles.listingTab, active && { borderBottomColor: colors.primary, borderBottomWidth: 2 }]}
              >
                <Text style={[styles.listingTabText, { color: active ? colors.primary : colors.textMuted, fontWeight: active ? "700" : "500" }]}>
                  {lt === "Sale" ? "Buy" : lt}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Category pills */}
        <Animated.ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pills}>
          {categories.map((cat) => {
            const active = category === cat.key;
            return (
              <Pressable
                key={cat.key}
                onPress={() => { Haptics.selectionAsync(); setCategory(cat.key); setSubType("All"); }}
                style={[styles.pill, { backgroundColor: active ? colors.text : "transparent", borderColor: active ? colors.text : colors.border }]}
              >
                <Text style={[styles.pillText, { color: active ? colors.background : colors.textSecondary }]}>{cat.label}</Text>
              </Pressable>
            );
          })}
        </Animated.ScrollView>

        {/* Sub-type pills */}
        {currentSubTypes.length > 0 && (
          <Animated.ScrollView entering={FadeIn.duration(200)} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.subPills}>
            {currentSubTypes.map((st) => {
              const active = subType === st;
              return (
                <Pressable
                  key={st}
                  onPress={() => { Haptics.selectionAsync(); setSubType(st); }}
                  style={[styles.subPill, { backgroundColor: active ? colors.primaryLight : "transparent", borderColor: active ? colors.primary : colors.border }]}
                >
                  <Text style={[styles.subPillText, { color: active ? colors.primary : colors.textMuted }]}>{st}</Text>
                </Pressable>
              );
            })}
          </Animated.ScrollView>
        )}
      </Animated.View>

      {/* ── Sort row ── */}
      <View style={[styles.sortRow, { borderBottomColor: colors.border }]}>
        <Text style={[styles.resultCount, { color: colors.textMuted }]}>
          {filtered.length} {filtered.length === 1 ? "place" : "places"}
        </Text>
        <Animated.ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 4 }}>
          {[
            { key: "match", label: "Best match" },
            { key: "price-low", label: "Cheapest" },
            { key: "price-high", label: "Premium" },
            { key: "trust", label: "Most trusted" },
            { key: "newest", label: "Newest" },
          ].map((s) => (
            <Pressable
              key={s.key}
              onPress={() => { Haptics.selectionAsync(); setSortBy(s.key); }}
              style={[styles.sortChip, sortBy === s.key && { backgroundColor: colors.text }]}
            >
              <Text style={[styles.sortChipText, { color: sortBy === s.key ? colors.background : colors.textMuted }]}>{s.label}</Text>
            </Pressable>
          ))}
        </Animated.ScrollView>
      </View>

      {/* ── Results ── */}
      <Animated.FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => <PropertyCard property={item} index={index} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="compass-outline" size={56} color={colors.textMuted} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>No results</Text>
            <Text style={[styles.emptyDesc, { color: colors.textMuted }]}>Try changing your search or filters</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchHeader: { paddingBottom: 4, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowRadius: 8 },
  searchBar: {
    flexDirection: "row", alignItems: "center", marginHorizontal: Spacing.base, marginTop: Spacing.sm,
    height: 46, borderRadius: 23, borderWidth: 1, paddingLeft: 14, paddingRight: 10, gap: 8,
    ...Platform.select({ ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4 }, android: { elevation: 1 } }),
  },
  searchInput: { flex: 1, fontSize: 14, fontWeight: "500", paddingVertical: 0 },
  cancelBtn: { paddingLeft: 8 },
  cancelText: { fontSize: 14, fontWeight: "600" },
  listingTabs: { flexDirection: "row", paddingHorizontal: Spacing.base, marginTop: 10, gap: 0 },
  listingTab: { flex: 1, alignItems: "center", paddingVertical: 10, borderBottomWidth: 2, borderBottomColor: "transparent" },
  listingTabText: { fontSize: 14 },
  pills: { gap: 8, paddingHorizontal: Spacing.base, paddingVertical: 10 },
  pill: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
  pillText: { fontSize: 13, fontWeight: "600" },
  subPills: { gap: 6, paddingHorizontal: Spacing.base, paddingBottom: 8 },
  subPill: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, borderWidth: 1 },
  subPillText: { fontSize: 12, fontWeight: "600" },
  sortRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: Spacing.base, paddingVertical: 8, borderBottomWidth: 0.5, gap: 10 },
  resultCount: { fontSize: 12, fontWeight: "600", minWidth: 55 },
  sortChip: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 14 },
  sortChipText: { fontSize: 12, fontWeight: "600" },
  list: { paddingHorizontal: Spacing.base, paddingTop: 14, paddingBottom: 100 },
  empty: { alignItems: "center", paddingTop: 80, gap: 8 },
  emptyTitle: { fontSize: 18, fontWeight: "700" },
  emptyDesc: { fontSize: 14 },
});
