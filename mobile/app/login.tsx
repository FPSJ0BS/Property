import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { useThemeColors } from "../src/hooks/useThemeColor";
import { Spacing, FontSize, BorderRadius } from "../src/constants/theme";

export default function LoginScreen() {
  const colors = useThemeColors();
  const router = useRouter();
  const [tab, setTab] = useState<"email" | "phone">("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSubmit = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert("Welcome!", "Login successful", [{ text: "OK", onPress: () => router.replace("/(tabs)") }]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          {/* Back button */}
          <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={12}>
            <Ionicons name="chevron-back" size={24} color={colors.text} />
          </Pressable>

          {/* Logo */}
          <View style={styles.logoWrap}>
            <LinearGradient colors={["#4f46e5", "#7c3aed"]} style={styles.logoIcon}>
              <Ionicons name="home" size={28} color="#fff" />
            </LinearGradient>
            <Text style={[styles.logoText, { color: colors.text }]}>99<Text style={{ color: colors.primary }}>tolet</Text></Text>
          </View>

          <Text style={[styles.title, { color: colors.text }]}>Welcome back</Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>Sign in to your account</Text>

          {/* Tab switcher */}
          <View style={[styles.tabRow, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            {(["phone", "email"] as const).map((t) => (
              <Pressable
                key={t}
                onPress={() => { Haptics.selectionAsync(); setTab(t); }}
                style={[styles.tab, tab === t && { backgroundColor: colors.primary }]}
              >
                <Text style={[styles.tabText, { color: tab === t ? "#fff" : colors.textMuted }]}>
                  {t === "phone" ? "Phone" : "Email"}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Form */}
          {tab === "phone" ? (
            <View style={styles.form}>
              <View style={[styles.inputRow, { borderColor: colors.border, backgroundColor: colors.surface }]}>
                <Text style={[styles.countryCode, { color: colors.textMuted }]}>+91</Text>
                <View style={[styles.inputDivider, { backgroundColor: colors.border }]} />
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Mobile number"
                  placeholderTextColor={colors.textMuted}
                  style={[styles.input, { color: colors.text }]}
                  keyboardType="phone-pad"
                  maxLength={10}
                />
              </View>
              {otpSent && (
                <View style={[styles.inputRow, { borderColor: colors.border, backgroundColor: colors.surface }]}>
                  <Ionicons name="key-outline" size={18} color={colors.textMuted} />
                  <TextInput
                    value={otp}
                    onChangeText={setOtp}
                    placeholder="Enter OTP"
                    placeholderTextColor={colors.textMuted}
                    style={[styles.input, { color: colors.text }]}
                    keyboardType="number-pad"
                    maxLength={6}
                  />
                </View>
              )}
              <Pressable
                onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); otpSent ? handleSubmit() : setOtpSent(true); }}
              >
                <LinearGradient colors={["#4f46e5", "#7c3aed"]} style={styles.submitBtn}>
                  <Text style={styles.submitText}>{otpSent ? "Verify & Sign In" : "Send OTP"}</Text>
                </LinearGradient>
              </Pressable>
            </View>
          ) : (
            <View style={styles.form}>
              <View style={[styles.inputRow, { borderColor: colors.border, backgroundColor: colors.surface }]}>
                <Ionicons name="mail-outline" size={18} color={colors.textMuted} />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email address"
                  placeholderTextColor={colors.textMuted}
                  style={[styles.input, { color: colors.text }]}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              <View style={[styles.inputRow, { borderColor: colors.border, backgroundColor: colors.surface }]}>
                <Ionicons name="lock-closed-outline" size={18} color={colors.textMuted} />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  placeholderTextColor={colors.textMuted}
                  style={[styles.input, { color: colors.text }]}
                  secureTextEntry={!showPassword}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)} hitSlop={10}>
                  <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={18} color={colors.textMuted} />
                </Pressable>
              </View>
              <Pressable onPress={handleSubmit}>
                <LinearGradient colors={["#4f46e5", "#7c3aed"]} style={styles.submitBtn}>
                  <Text style={styles.submitText}>Sign In</Text>
                </LinearGradient>
              </Pressable>
            </View>
          )}

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
            <Text style={[styles.dividerText, { color: colors.textMuted }]}>or continue with</Text>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
          </View>

          {/* Social login */}
          <View style={styles.socialRow}>
            <Pressable style={[styles.socialBtn, { borderColor: colors.border }]} onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
              <Ionicons name="logo-google" size={20} color={colors.text} />
              <Text style={[styles.socialText, { color: colors.text }]}>Google</Text>
            </Pressable>
            <Pressable style={[styles.socialBtn, { borderColor: colors.border }]} onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
              <Ionicons name="logo-apple" size={20} color={colors.text} />
              <Text style={[styles.socialText, { color: colors.text }]}>Apple</Text>
            </Pressable>
          </View>

          {/* Sign up link */}
          <View style={styles.signupRow}>
            <Text style={[styles.signupText, { color: colors.textMuted }]}>Don't have an account?</Text>
            <Pressable onPress={() => router.push("/signup")}>
              <Text style={[styles.signupLink, { color: colors.primary }]}> Sign Up</Text>
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
  logoWrap: { alignItems: "center", marginTop: 20, marginBottom: 24 },
  logoIcon: { width: 60, height: 60, borderRadius: 18, alignItems: "center", justifyContent: "center", marginBottom: 12 },
  logoText: { fontSize: 28, fontWeight: "800" },
  title: { fontSize: 26, fontWeight: "800", textAlign: "center", letterSpacing: -0.3 },
  subtitle: { fontSize: 15, textAlign: "center", marginTop: 6, marginBottom: 28 },
  tabRow: { flexDirection: "row", borderRadius: 12, borderWidth: 1, padding: 4, marginBottom: 24 },
  tab: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: "center" },
  tabText: { fontSize: 14, fontWeight: "600" },
  form: { gap: 14, marginBottom: 24 },
  inputRow: { flexDirection: "row", alignItems: "center", height: 52, borderRadius: 14, borderWidth: 1, paddingHorizontal: 14, gap: 10 },
  countryCode: { fontSize: 15, fontWeight: "600" },
  inputDivider: { width: 1, height: 24 },
  input: { flex: 1, fontSize: 15, paddingVertical: 0 },
  submitBtn: { height: 52, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  dividerRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 20 },
  dividerLine: { flex: 1, height: 1 },
  dividerText: { fontSize: 13 },
  socialRow: { flexDirection: "row", gap: 12, marginBottom: 28 },
  socialBtn: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, height: 50, borderRadius: 14, borderWidth: 1 },
  socialText: { fontSize: 14, fontWeight: "600" },
  signupRow: { flexDirection: "row", justifyContent: "center" },
  signupText: { fontSize: 14 },
  signupLink: { fontSize: 14, fontWeight: "700" },
});
