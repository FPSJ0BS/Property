import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import Animated, { FadeIn, FadeOut, Layout, SlideOutLeft } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useThemeColors } from "../../src/hooks/useThemeColor";
import { useStore } from "../../src/store/useStore";
import { properties } from "../../src/data/properties";
import { Spacing, FontSize, BorderRadius } from "../../src/constants/theme";
import PropertyCard from "../../src/components/PropertyCard";

export default function SavedScreen() {
  const colors = useThemeColors();
  const { savedIds, clearSaved } = useStore();
  const savedProperties = properties.filter((p) => savedIds.includes(p.id));

  const handleClear = () => {
    Alert.alert(
      "Clear all saved?",
      "This will remove all your saved properties.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            clearSaved();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top"]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.text }]}>Saved</Text>
        {savedProperties.length > 0 && (
          <Pressable onPress={handleClear} hitSlop={10}>
            <Text style={[styles.clearBtn, { color: colors.textMuted }]}>Clear all</Text>
          </Pressable>
        )}
      </View>

      {savedProperties.length > 0 ? (
        <Animated.FlatList
          data={savedProperties}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          itemLayoutAnimation={Layout.springify().damping(18)}
          renderItem={({ item, index }) => (
            <Animated.View exiting={SlideOutLeft.duration(300)}>
              <PropertyCard property={item} index={index} />
            </Animated.View>
          )}
        />
      ) : (
        <Animated.View entering={FadeIn.delay(200)} style={styles.empty}>
          <View style={[styles.emptyCircle, { backgroundColor: colors.surface }]}>
            <Ionicons name="heart-outline" size={52} color={colors.textMuted} />
          </View>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>No saves yet</Text>
          <Text style={[styles.emptyDesc, { color: colors.textMuted }]}>
            Tap the heart on any listing to save it here
          </Text>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.base,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
  },
  title: { fontSize: 28, fontWeight: "800", letterSpacing: -0.5 },
  clearBtn: { fontSize: 14, fontWeight: "600" },
  list: { paddingHorizontal: Spacing.base, paddingTop: 16, paddingBottom: 100 },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    gap: 12,
    marginBottom: 80,
  },
  emptyCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  emptyTitle: { fontSize: 20, fontWeight: "800" },
  emptyDesc: { fontSize: 15, textAlign: "center", lineHeight: 22 },
});
