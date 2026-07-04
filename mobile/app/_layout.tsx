import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useStore } from "../src/store/useStore";

SplashScreen.preventAutoHideAsync();

const modalScreenOptions = {
  headerShown: false,
  animation: "slide_from_right" as const,
  gestureEnabled: true,
  gestureDirection: "horizontal" as const,
};

export default function RootLayout() {
  const hydrate = useStore((s) => s.hydrate);
  const hydrated = useStore((s) => s.hydrated);

  useEffect(() => { hydrate(); }, [hydrate]);
  useEffect(() => { if (hydrated) SplashScreen.hideAsync(); }, [hydrated]);

  if (!hydrated) return null;

  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="property/[id]" options={modalScreenOptions} />
        <Stack.Screen name="login" options={{ ...modalScreenOptions, animation: "slide_from_bottom" }} />
        <Stack.Screen name="signup" options={{ ...modalScreenOptions, animation: "slide_from_bottom" }} />
        <Stack.Screen name="blog" options={modalScreenOptions} />
        <Stack.Screen name="contact" options={modalScreenOptions} />
        <Stack.Screen name="faq" options={modalScreenOptions} />
        <Stack.Screen name="pricing" options={modalScreenOptions} />
        <Stack.Screen name="about" options={modalScreenOptions} />
        <Stack.Screen name="areas" options={modalScreenOptions} />
      </Stack>
    </>
  );
}
