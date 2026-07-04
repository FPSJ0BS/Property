import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeIn } from "react-native-reanimated";
import { Property } from "../data/properties";
import { formatPrice } from "../utils/format";
import { useThemeColors } from "../hooks/useThemeColor";
import { useStore } from "../store/useStore";
import { BorderRadius, FontSize, Spacing } from "../constants/theme";

const { width: SCREEN_W } = Dimensions.get("window");
const CARD_W = SCREEN_W - Spacing.base * 2;
const IMAGE_H = CARD_W * 0.62;

interface Props {
  property: Property;
  index?: number;
}

export default function PropertyCard({ property, index = 0 }: Props) {
  const colors = useThemeColors();
  const router = useRouter();
  const { toggleSaved, isSaved } = useStore();
  const saved = isSaved(property.id);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(`/property/${property.id}`);
  };

  const handleSave = (e: any) => {
    e.stopPropagation?.();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    toggleSaved(property.id);
  };

  return (
    <Animated.View entering={FadeIn.delay(index * 80).duration(400)}>
      <Pressable onPress={handlePress} style={styles.card}>
        {/* ── Image ── */}
        <View style={styles.imageWrap}>
          <Image
            source={{ uri: property.images[0] }}
            style={styles.image}
            contentFit="cover"
            transition={250}
            recyclingKey={property.id}
          />

          {/* Top-left: Locality Pulse pill */}
          {property.localityPulse === "High Demand" && (
            <View style={styles.pulsePill}>
              <Text style={styles.pulsePillText}>HIGH DEMAND</Text>
            </View>
          )}

          {/* Top-right: Save button */}
          <Pressable onPress={handleSave} hitSlop={14} style={styles.heartBtn}>
            <Ionicons
              name={saved ? "heart" : "heart-outline"}
              size={22}
              color={saved ? "#ff385c" : "#fff"}
            />
          </Pressable>

          {/* Bottom gradient + location */}
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.55)"]}
            style={styles.gradient}
          >
            <View style={styles.locationRow}>
              <Ionicons name="location-sharp" size={13} color="#fff" />
              <Text style={styles.locationText}>
                {property.locality}, {property.city}
              </Text>
            </View>
          </LinearGradient>

          {/* Image pagination dots (fake – just shows count) */}
          <View style={styles.dotsRow}>
            {property.images.slice(0, 5).map((_, i) => (
              <View
                key={i}
                style={[styles.dot, i === 0 && styles.dotActive]}
              />
            ))}
          </View>
        </View>

        {/* ── Content ── */}
        <View style={styles.body}>
          {/* Row 1: Title + AI Score */}
          <View style={styles.titleRow}>
            <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
              {property.title}
            </Text>
            <View style={styles.aiPill}>
              <Ionicons name="sparkles" size={10} color="#4f46e5" />
              <Text style={styles.aiScore}>{property.aiMatchScore}%</Text>
            </View>
          </View>

          {/* Row 2: Meta chips */}
          <View style={styles.metaRow}>
            {property.bedrooms != null && (
              <Text style={[styles.metaChip, { color: colors.textSecondary }]}>
                {property.bedrooms} bed
              </Text>
            )}
            {property.bathrooms != null && (
              <>
                <Text style={[styles.metaDot, { color: colors.textMuted }]}>·</Text>
                <Text style={[styles.metaChip, { color: colors.textSecondary }]}>
                  {property.bathrooms} bath
                </Text>
              </>
            )}
            <Text style={[styles.metaDot, { color: colors.textMuted }]}>·</Text>
            <Text style={[styles.metaChip, { color: colors.textSecondary }]}>
              {property.area} sqft
            </Text>
            <Text style={[styles.metaDot, { color: colors.textMuted }]}>·</Text>
            <Text style={[styles.metaChip, { color: colors.textSecondary }]}>
              {property.furnishing}
            </Text>
          </View>

          {/* Row 3: Price + badges */}
          <View style={styles.bottomRow}>
            <Text style={[styles.price, { color: colors.text }]}>
              {formatPrice(property.price)}
              <Text style={[styles.perMonth, { color: colors.textMuted }]}> /month</Text>
            </Text>
            <View style={styles.badgeRow}>
              {property.isVerified && (
                <View style={styles.verifiedBadge}>
                  <Ionicons name="shield-checkmark" size={11} color="#059669" />
                </View>
              )}
              {property.fairRent === "Below Market" && (
                <View style={styles.dealBadge}>
                  <Text style={styles.dealBadgeText}>DEAL</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },

  /* ── Image ── */
  imageWrap: {
    width: CARD_W,
    height: IMAGE_H,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#e2e8f0",
  },
  image: { width: "100%", height: "100%" },

  pulsePill: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#000",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  pulsePillText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.8,
  },

  heartBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },

  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    justifyContent: "flex-end",
    paddingHorizontal: 14,
    paddingBottom: 26,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  dotsRow: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.45)",
  },
  dotActive: {
    backgroundColor: "#fff",
    width: 18,
    borderRadius: 3,
  },

  /* ── Body ── */
  body: {
    paddingTop: 10,
    paddingHorizontal: 2,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
  },
  aiPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "#eef2ff",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  aiScore: {
    fontSize: 11,
    fontWeight: "800",
    color: "#4f46e5",
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  metaChip: {
    fontSize: 13,
  },
  metaDot: {
    fontSize: 13,
    marginHorizontal: 5,
  },

  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },
  price: {
    fontSize: 17,
    fontWeight: "800",
  },
  perMonth: {
    fontSize: 13,
    fontWeight: "400",
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  verifiedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#ecfdf5",
    alignItems: "center",
    justifyContent: "center",
  },
  dealBadge: {
    backgroundColor: "#fef2f2",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 5,
  },
  dealBadgeText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#dc2626",
    letterSpacing: 0.5,
  },
});
