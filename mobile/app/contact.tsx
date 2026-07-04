import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { useThemeColors } from "../src/hooks/useThemeColor";
import { Spacing } from "../src/constants/theme";

const contactInfo = [
  { icon: "location" as const, label: "Office", value: "Jaipur, Rajasthan, India" },
  { icon: "mail" as const, label: "Email", value: "hello@99tolet.com" },
  { icon: "call" as const, label: "Phone", value: "+91 99999 99999" },
  { icon: "logo-whatsapp" as const, label: "WhatsApp", value: "+91 99999 99999" },
];

export default function ContactScreen() {
  const colors = useThemeColors();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setSent(true);
  };

  if (sent) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.successWrap}>
          <View style={[styles.successIcon, { backgroundColor: "#ecfdf5" }]}>
            <Ionicons name="checkmark-circle" size={56} color="#059669" />
          </View>
          <Text style={[styles.successTitle, { color: colors.text }]}>Message sent!</Text>
          <Text style={[styles.successDesc, { color: colors.textMuted }]}>We'll get back to you within 24 hours.</Text>
          <Pressable onPress={() => { setSent(false); setName(""); setEmail(""); setMessage(""); }}>
            <Text style={[styles.anotherMsg, { color: colors.primary }]}>Send another message</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={[styles.header, { borderBottomColor: colors.border }]}>
            <Pressable onPress={() => router.back()} hitSlop={12}>
              <Ionicons name="chevron-back" size={24} color={colors.text} />
            </Pressable>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Contact Us</Text>
            <View style={{ width: 24 }} />
          </View>

          {/* Contact info cards */}
          <View style={styles.infoGrid}>
            {contactInfo.map((c) => (
              <Pressable
                key={c.label}
                onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
                style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              >
                <Ionicons name={c.icon} size={20} color={colors.primary} />
                <View>
                  <Text style={[styles.infoLabel, { color: colors.textMuted }]}>{c.label}</Text>
                  <Text style={[styles.infoValue, { color: colors.text }]}>{c.value}</Text>
                </View>
              </Pressable>
            ))}
          </View>

          {/* Form */}
          <Text style={[styles.formTitle, { color: colors.text }]}>Send us a message</Text>
          <View style={styles.form}>
            <TextInput value={name} onChangeText={setName} placeholder="Your name" placeholderTextColor={colors.textMuted}
              style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.surface }]} />
            <TextInput value={email} onChangeText={setEmail} placeholder="Email" placeholderTextColor={colors.textMuted}
              style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.surface }]} keyboardType="email-address" autoCapitalize="none" />
            <TextInput value={message} onChangeText={setMessage} placeholder="Your message..." placeholderTextColor={colors.textMuted}
              style={[styles.input, styles.textarea, { color: colors.text, borderColor: colors.border, backgroundColor: colors.surface }]} multiline numberOfLines={5} textAlignVertical="top" />
            <Pressable onPress={handleSubmit}>
              <LinearGradient colors={["#4f46e5", "#7c3aed"]} style={styles.submitBtn}>
                <Text style={styles.submitText}>Send Message</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingBottom: 40 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: Spacing.base, paddingVertical: 14, borderBottomWidth: 0.5 },
  headerTitle: { fontSize: 18, fontWeight: "700" },
  infoGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, paddingHorizontal: Spacing.base, paddingTop: 20, paddingBottom: 24 },
  infoCard: { width: "47%", flexDirection: "row", alignItems: "center", gap: 10, padding: 14, borderRadius: 14, borderWidth: 1 },
  infoLabel: { fontSize: 11, fontWeight: "500" },
  infoValue: { fontSize: 13, fontWeight: "600", marginTop: 1 },
  formTitle: { fontSize: 18, fontWeight: "800", paddingHorizontal: Spacing.base, marginBottom: 14 },
  form: { paddingHorizontal: Spacing.base, gap: 12 },
  input: { height: 50, borderRadius: 14, borderWidth: 1, paddingHorizontal: 14, fontSize: 15 },
  textarea: { height: 120, paddingTop: 14 },
  submitBtn: { height: 52, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  successWrap: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 40, gap: 12 },
  successIcon: { width: 96, height: 96, borderRadius: 48, alignItems: "center", justifyContent: "center", marginBottom: 8 },
  successTitle: { fontSize: 22, fontWeight: "800" },
  successDesc: { fontSize: 15, textAlign: "center" },
  anotherMsg: { fontSize: 15, fontWeight: "700", marginTop: 16 },
});
