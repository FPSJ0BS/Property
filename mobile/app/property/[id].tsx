import { useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  Share,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import { Image } from "expo-image";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolation,
  FadeIn,
} from "react-native-reanimated";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { useThemeColors } from "../../src/hooks/useThemeColor";
import { properties } from "../../src/data/properties";
import { formatPrice } from "../../src/utils/format";
import { useStore } from "../../src/store/useStore";
import { Spacing, FontSize, BorderRadius } from "../../src/constants/theme";

const { width: W, height: H } = Dimensions.get("window");
const IMG_H = W * 0.85;

export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();
  const { toggleSaved, isSaved, addViewed } = useStore();
  const scrollY = useSharedValue(0);

  const property = properties.find((p) => p.id === id);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => { scrollY.value = e.contentOffset.y; },
  });

  // Parallax image
  const imageStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(scrollY.value, [-100, 0, IMG_H], [-50, 0, IMG_H * 0.4], Extrapolation.CLAMP) },
      { scale: interpolate(scrollY.value, [-100, 0], [1.3, 1], Extrapolation.CLAMP) },
    ],
  }));

  // Navbar fade-in
  const navBgStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [IMG_H - 140, IMG_H - 80], [0, 1], Extrapolation.CLAMP),
  }));
  const navTitleStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [IMG_H - 100, IMG_H - 60], [0, 1], Extrapolation.CLAMP),
  }));

  if (!property) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text, textAlign: "center", marginTop: 100 }}>Property not found</Text>
      </SafeAreaView>
    );
  }

  const saved = isSaved(property.id);
  addViewed(property.id);

  const handleShare = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await Share.share({
      title: property.title,
      message: `${property.title} — ${formatPrice(property.price)}/month in ${property.locality}, ${property.city}`,
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* ── Floating Nav Bar ── */}
      <View style={[styles.navBar, { paddingTop: insets.top }]}>
        {/* Background that fades in on scroll */}
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: colors.background, borderBottomWidth: 0.5, borderBottomColor: colors.border },
            navBgStyle,
          ]}
        />

        <Pressable
          onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); router.back(); }}
          style={styles.navBtn}
        >
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </Pressable>

        <Animated.Text
          style={[styles.navTitle, { color: colors.text }, navTitleStyle]}
          numberOfLines={1}
        >
          {property.title}
        </Animated.Text>

        <View style={styles.navRight}>
          <Pressable onPress={handleShare} style={styles.navBtn}>
            <Ionicons name="share-outline" size={20} color="#fff" />
          </Pressable>
          <Pressable
            onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); toggleSaved(property.id); }}
            style={styles.navBtn}
          >
            <Ionicons name={saved ? "heart" : "heart-outline"} size={20} color={saved ? "#ff385c" : "#fff"} />
          </Pressable>
        </View>
      </View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* ── Parallax Image ── */}
        <Animated.View style={[styles.imageWrap, imageStyle]}>
          <Image
            source={{ uri: property.images[0] }}
            style={styles.heroImage}
            contentFit="cover"
            transition={300}
          />
          <LinearGradient
            colors={["rgba(0,0,0,0.3)", "transparent", "transparent", "rgba(0,0,0,0.4)"]}
            locations={[0, 0.3, 0.6, 1]}
            style={StyleSheet.absoluteFillObject}
          />
          {/* Image dots */}
          <View style={styles.imgDots}>
            {property.images.slice(0, 5).map((_, i) => (
              <View key={i} style={[styles.imgDot, i === 0 && styles.imgDotActive]} />
            ))}
          </View>
        </Animated.View>

        {/* ── Content ── */}
        <View style={[styles.content, { backgroundColor: colors.background }]}>
          {/* Badges row */}
          <Animated.View entering={FadeIn.delay(100)} style={styles.badgesRow}>
            {property.isVerified && (
              <View style={[styles.badge, { backgroundColor: "#ecfdf5" }]}>
                <Ionicons name="shield-checkmark" size={12} color="#059669" />
                <Text style={[styles.badgeText, { color: "#059669" }]}>Verified</Text>
              </View>
            )}
            {property.moveInReady && (
              <View style={[styles.badge, { backgroundColor: "#eef2ff" }]}>
                <Ionicons name="flash" size={12} color="#4f46e5" />
                <Text style={[styles.badgeText, { color: "#4f46e5" }]}>Move-in Ready</Text>
              </View>
            )}
            <View style={[styles.badge, { backgroundColor: "#fefce8" }]}>
              <Ionicons name="star" size={12} color="#ca8a04" />
              <Text style={[styles.badgeText, { color: "#ca8a04" }]}>{property.landlord.rating}</Text>
            </View>
          </Animated.View>

          {/* Title */}
          <Text style={[styles.title, { color: colors.text }]}>{property.title}</Text>

          {/* Location */}
          <Pressable style={styles.locationRow}>
            <Ionicons name="location-sharp" size={15} color={colors.primary} />
            <Text style={[styles.locationText, { color: colors.textSecondary }]}>
              {property.address}
            </Text>
          </Pressable>

          {/* ── Quick Stats Row ── */}
          <View style={[styles.statsRow, { borderColor: colors.border }]}>
            {property.bedrooms != null && (
              <View style={styles.statItem}>
                <Ionicons name="bed-outline" size={22} color={colors.textMuted} />
                <Text style={[styles.statValue, { color: colors.text }]}>{property.bedrooms}</Text>
                <Text style={[styles.statLabel, { color: colors.textMuted }]}>Beds</Text>
              </View>
            )}
            {property.bathrooms != null && (
              <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            )}
            {property.bathrooms != null && (
              <View style={styles.statItem}>
                <Ionicons name="water-outline" size={22} color={colors.textMuted} />
                <Text style={[styles.statValue, { color: colors.text }]}>{property.bathrooms}</Text>
                <Text style={[styles.statLabel, { color: colors.textMuted }]}>Baths</Text>
              </View>
            )}
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Ionicons name="resize-outline" size={22} color={colors.textMuted} />
              <Text style={[styles.statValue, { color: colors.text }]}>{property.area}</Text>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>Sqft</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Ionicons name="home-outline" size={22} color={colors.textMuted} />
              <Text style={[styles.statValue, { color: colors.text }]}>{property.furnishing.split(" ")[0]}</Text>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>Type</Text>
            </View>
          </View>

          {/* ── AI Scores ── */}
          <View style={styles.scoresRow}>
            <View style={[styles.scoreCard, { backgroundColor: "#eef2ff" }]}>
              <View style={styles.scoreInner}>
                <Ionicons name="sparkles" size={20} color="#4f46e5" />
                <View>
                  <Text style={styles.scoreNum}>{property.aiMatchScore}%</Text>
                  <Text style={styles.scoreLbl}>AI Match</Text>
                </View>
              </View>
            </View>
            <View style={[styles.scoreCard, { backgroundColor: "#ecfdf5" }]}>
              <View style={styles.scoreInner}>
                <Ionicons name="shield-checkmark" size={20} color="#059669" />
                <View>
                  <Text style={[styles.scoreNum, { color: "#059669" }]}>{property.trustScore}%</Text>
                  <Text style={[styles.scoreLbl, { color: "#059669" }]}>Trust</Text>
                </View>
              </View>
            </View>
          </View>

          {/* ── About ── */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>About this place</Text>
            <Text style={[styles.desc, { color: colors.textSecondary }]}>{property.description}</Text>
          </View>

          {/* ── Highlights ── */}
          {property.highlights.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>What this place offers</Text>
              {property.highlights.map((h) => (
                <View key={h} style={[styles.offerRow, { borderBottomColor: colors.border }]}>
                  <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                  <Text style={[styles.offerText, { color: colors.text }]}>{h}</Text>
                </View>
              ))}
            </View>
          )}

          {/* ── Amenities ── */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Amenities</Text>
            <View style={styles.amenGrid}>
              {property.amenities.map((a) => (
                <View key={a} style={[styles.amenItem, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                  <Ionicons name="checkmark" size={14} color={colors.primary} />
                  <Text style={[styles.amenText, { color: colors.text }]}>{a}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* ── Landlord ── */}
          <View style={[styles.landlordCard, { borderColor: colors.border }]}>
            <View style={styles.landlordRow}>
              <View style={[styles.landlordAvatar, { backgroundColor: colors.primaryLight }]}>
                <Text style={[styles.landlordInitial, { color: colors.primary }]}>
                  {property.landlord.name[0]}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.landlordNameRow}>
                  <Text style={[styles.landlordName, { color: colors.text }]}>{property.landlord.name}</Text>
                  {property.landlord.verified && <Ionicons name="checkmark-circle" size={16} color="#059669" />}
                </View>
                <Text style={[styles.landlordMeta, { color: colors.textMuted }]}>
                  Responds {property.landlord.responseTime} · {property.landlord.rating}★
                </Text>
              </View>
            </View>
            <Pressable
              onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); Alert.alert("Message", "Chat feature coming soon!"); }}
              style={[styles.msgBtn, { borderColor: colors.text }]}
            >
              <Text style={[styles.msgBtnText, { color: colors.text }]}>Message landlord</Text>
            </Pressable>
          </View>
        </View>
      </Animated.ScrollView>

      {/* ── Bottom Bar ── */}
      <View style={[styles.bottomBar, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
        <SafeAreaView edges={["bottom"]} style={styles.bottomInner}>
          <View>
            <Text style={[styles.bottomPrice, { color: colors.text }]}>
              {formatPrice(property.price)}
              <Text style={{ color: colors.textMuted, fontSize: 14, fontWeight: "400" }}> /month</Text>
            </Text>
          </View>
          <Pressable
            onPress={() => {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              Alert.alert("Booking", "Schedule a visit feature coming soon!");
            }}
          >
            <LinearGradient
              colors={["#4f46e5", "#7c3aed"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.bookBtn}
            >
              <Text style={styles.bookBtnText}>Schedule Visit</Text>
            </LinearGradient>
          </Pressable>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  /* ── Nav ── */
  navBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  navBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  navTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
    marginHorizontal: 8,
  },
  navRight: { flexDirection: "row", gap: 6 },

  /* ── Image ── */
  imageWrap: { width: W, height: IMG_H, overflow: "hidden" },
  heroImage: { width: W, height: IMG_H },
  imgDots: {
    position: "absolute",
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },
  imgDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.45)" },
  imgDotActive: { width: 20, borderRadius: 3, backgroundColor: "#fff" },

  /* ── Content ── */
  content: {
    marginTop: -20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: Spacing.base,
    paddingTop: 24,
  },

  badgesRow: { flexDirection: "row", gap: 8, marginBottom: 12 },
  badge: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  badgeText: { fontSize: 12, fontWeight: "700" },

  title: { fontSize: 22, fontWeight: "800", lineHeight: 28, letterSpacing: -0.3 },

  locationRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 6, marginBottom: 20 },
  locationText: { fontSize: 14, flex: 1 },

  /* ── Stats ── */
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 16,
    marginBottom: 16,
  },
  statItem: { flex: 1, alignItems: "center", gap: 4 },
  statValue: { fontSize: 17, fontWeight: "800" },
  statLabel: { fontSize: 11, fontWeight: "500" },
  statDivider: { width: 1, height: 36 },

  /* ── Scores ── */
  scoresRow: { flexDirection: "row", gap: 10, marginBottom: 24 },
  scoreCard: { flex: 1, borderRadius: 14, padding: 14 },
  scoreInner: { flexDirection: "row", alignItems: "center", gap: 10 },
  scoreNum: { fontSize: 20, fontWeight: "800", color: "#4f46e5" },
  scoreLbl: { fontSize: 11, fontWeight: "600", color: "#4f46e5" },

  /* ── Sections ── */
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: "800", marginBottom: 12, letterSpacing: -0.2 },
  desc: { fontSize: 15, lineHeight: 24 },

  offerRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 12, borderBottomWidth: 0.5 },
  offerText: { fontSize: 15, flex: 1 },

  amenGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  amenItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  amenText: { fontSize: 13, fontWeight: "500" },

  /* ── Landlord ── */
  landlordCard: { borderWidth: 1, borderRadius: 16, padding: 16, marginBottom: 24 },
  landlordRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 14 },
  landlordAvatar: { width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center" },
  landlordInitial: { fontSize: 20, fontWeight: "800" },
  landlordNameRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  landlordName: { fontSize: 16, fontWeight: "700" },
  landlordMeta: { fontSize: 13, marginTop: 2 },
  msgBtn: { borderWidth: 1.5, borderRadius: 10, paddingVertical: 10, alignItems: "center" },
  msgBtnText: { fontSize: 14, fontWeight: "700" },

  /* ── Bottom ── */
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 0.5,
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.08, shadowRadius: 12 },
      android: { elevation: 12 },
    }),
  },
  bottomInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.base,
    paddingTop: 12,
  },
  bottomPrice: { fontSize: 19, fontWeight: "800" },
  bookBtn: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  bookBtnText: { color: "#fff", fontSize: 15, fontWeight: "700" },
});
