"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isNative, isIOS } from "@/lib/capacitor";
import BottomTabBar from "./BottomTabBar";
import PullToRefresh from "./PullToRefresh";
import MobilePageTransition from "./MobilePageTransition";

// Pages where we hide the bottom tab bar (full-screen experiences)
const hideTabBarPaths = [
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/verify-account",
  "/onboarding",
  "/property/",
];

function shouldHideTabBar(pathname: string) {
  return hideTabBarPaths.some((p) => pathname.startsWith(p));
}

interface MobileAppShellProps {
  children: React.ReactNode;
}

export default function MobileAppShell({ children }: MobileAppShellProps) {
  const pathname = usePathname();
  const showTabBar = !shouldHideTabBar(pathname);

  // Initialize native plugins
  useEffect(() => {
    if (!isNative) return;

    async function initNative() {
      try {
        const { StatusBar, Style } = await import("@capacitor/status-bar");
        await StatusBar.setStyle({ style: Style.Light });

        if (!isIOS) {
          await StatusBar.setBackgroundColor({ color: "#ffffff" });
        }
      } catch {
        // Status bar plugin not available
      }

      try {
        const { SplashScreen } = await import("@capacitor/splash-screen");
        await SplashScreen.hide();
      } catch {
        // Splash screen plugin not available
      }

      try {
        const { Keyboard } = await import("@capacitor/keyboard");
        await Keyboard.setAccessoryBarVisible({ isVisible: true });
      } catch {
        // Keyboard plugin not available
      }
    }

    initNative();
  }, []);

  // Handle hardware back button on Android
  useEffect(() => {
    if (!isNative) return;

    let cleanup: (() => void) | undefined;

    async function setupBackButton() {
      try {
        const { App } = await import("@capacitor/app");
        const listener = await App.addListener("backButton", ({ canGoBack }) => {
          if (canGoBack) {
            window.history.back();
          } else {
            App.exitApp();
          }
        });
        cleanup = () => listener.remove();
      } catch {
        // App plugin not available
      }
    }

    setupBackButton();
    return () => cleanup?.();
  }, []);

  return (
    <>
      <PullToRefresh>
        <MobilePageTransition>
          {/* Main content with bottom padding for tab bar */}
          <div className={showTabBar ? "pb-20 lg:pb-0" : ""}>
            {children}
          </div>
        </MobilePageTransition>
      </PullToRefresh>

      {/* Bottom tab bar — hidden on desktop and auth pages */}
      {showTabBar && <BottomTabBar />}
    </>
  );
}
