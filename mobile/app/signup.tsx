import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { useThemeColors } from "../src/hooks/useThemeColor";
import { Spacing, BorderRadius } from "../src/constants/theme";

const roles = [
  { key: "tenant", icon: "person" as const, label: "Tenant", desc: "Find your perfect rental" },
  { key: "landlord", icon: "home" as const, label: "Landlord", desc: "List & manage properties" },
  { key: "broker", icon: "people" as const, label: "Broker", desc: "Manage client listings" },
  { key: "enterprise", icon: "business" as const, label: "Enterprise", desc: "Bulk leasing solutions" },
  { key: "nri", icon: "globe" as const, label: "NRI Owner", desc: "Remote property management" },
];

export default function SignupScreen() {
  const colors = useThemeColors();
  const router = useRouter();
  const [phase, setPhase] = useState<1 | 2>(1);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert("Welcome!", "Account created successfully", [{ text: "OK", onPress: () => router.replace("/(tabs)") }]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Pressable onPress={() => phase === 2 ? setPhase(1) : router.back()} style={styles.backBtn} hitSlop={12}>
            <Ionicons name="chevron-back" size={24} color={colors.text} />
          </Pressable>

          <Text style={[styles.title, { color: colors.text }]}>
            {phase === 1 ? "I am a..." : "Create account"}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            {phase === 1 ? "Select your role to get started" : `Signing up as ${role}`}
          </Text>

          {phase === 1 ? (
            <View style={styles.rolesGrid}>
              {roles.map((r, i) => (
                <Animated.View key={r.key} entering={FadeInDown.delay(i * 60).springify().damping(16)}>
                  <Pressable
                    onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); setRole(r.label); setPhase(2); }}
                    style={({ pressed }) => [
                      styles.roleCard,
                      { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.85 : 1 },
                    ]}
                  >
                    <View style={[styles.roleIcon, { backgroundColor: colors.primaryLight }]}>
                      <Ionicons name={r.icon} size={24} color={colors.primary} />
                    </View>
                    <Text style={[styles.roleLabel, { color: colors.text }]}>{r.label}</Text>
                    <Text style={[styles.roleDesc, { color: colors.textMuted }]}>{r.desc}</Text>
                    <Ionicons name="chevron-forward" size={16} color={colors.textMuted} style={styles.roleArrow} />
                  </Pressable>
                </Animated.View>
              ))}
            </View>
          ) : (
            <View style={styles.form}>
              {[
                { value: name, set: setName, placeholder: "Full Name", icon: "person-outline" as const, kb: "default" as const },
                { value: email, set: setEmail, placeholder: "Email", icon: "mail-outline" as const, kb: "email-address" as const },
                { value: phone, set: setPhone, placeholder: "Mobile (+91)", icon: "call-outline" as const, kb: "phone-pad" as const },
              ].map((f) => (
                <View key={f.placeholder} style={[styles.inputRow, { borderColor: colors.border, backgroundColor: colors.surface }]}>
                  <Ionicons name={f.icon} size={18} color={colors.textMuted} />
                  <TextInput
                    value={f.value}
                    onChangeText={f.set}
                    placeholder={f.placeholder}
                    placeholderTextColor={colors.textMuted}
                    style={[styles.input, { color: colors.text }]}
                    keyboardType={f.kb}
                    autoCapitalize={f.kb === "email-address" ? "none" : "words"}
                  />
                </View>
              ))}
              <View style={[styles.inputRow, { borderColor: colors.border, backgroundColor: colors.surface }]}>
                <Ionicons name="lock-closed-outline" size={18} color={colors.textMuted} />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  placeholderTextColor={colors.textMuted}
                  style={[styles.input, { color: colors.text }]}
                  secureTextEntry
                />
              </View>
              <Pressable onPress={handleSignup}>
                <LinearGradient colors={["#4f46e5", "#7c3aed"]} style={styles.submitBtn}>
                  <Text style={styles.submitText}>Create Account</Text>
                </LinearGradient>
              </Pressable>
            </View>
          )}

          <View style={styles.loginRow}>
            <Text style={[styles.loginText, { color: colors.textMuted }]}>Already have an account?</Text>
            <Pressable onPress={() => router.push("/login")}>
              <Text style={[styles.loginLink, { color: colors.primary }]}> Sign In</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 40 },
  backBtn: { width: 40, height: 40, justifyContent: "center" },
  title: { fontSize: 26, fontWeight: "800", marginTop: 16, letterSpacing: -0.3 },
  subtitle: { fontSize: 15, marginTop: 6, marginBottom: 28 },
  rolesGrid: { gap: 12 },
  roleCard: { flexDirection: "row", alignItems: "center", gap: 14, padding: 16, borderRadius: 16, borderWidth: 1 },
  roleIcon: { width: 48, height: 48, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  roleLabel: { fontSize: 16, fontWeight: "700" },
  roleDesc: { fontSize: 12, flex: 1 },
  roleArrow: { position: "absolute", right: 16 },
  form: { gap: 14 },
  inputRow: { flexDirection: "row", alignItems: "center", height: 52, borderRadius: 14, borderWidth: 1, paddingHorizontal: 14, gap: 10 },
  input: { flex: 1, fontSize: 15, paddingVertical: 0 },
  submitBtn: { height: 52, borderRadius: 14, alignItems: "center", justifyContent: "center", marginTop: 4 },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  loginRow: { flexDirection: "row", justifyContent: "center", marginTop: 24 },
  loginText: { fontSize: 14 },
  loginLink: { fontSize: 14, fontWeight: "700" },
});
