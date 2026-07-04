import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import { OrganizationJsonLd } from "@/components/shared/JsonLd";
import AIChatWidget from "@/components/shared/AIChatWidget";
import KeyboardShortcuts from "@/components/shared/KeyboardShortcuts";
import BackToTop from "@/components/shared/BackToTop";
import ScrollProgress from "@/components/shared/ScrollProgress";
import CookieConsent from "@/components/shared/CookieConsent";
import SocialProofToast from "@/components/engagement/SocialProofToast";
import { LanguageProvider } from "@/i18n/LanguageContext";
import MobileAppShell from "@/components/mobile/MobileAppShell";
import { AuthProvider } from "@/lib/auth";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#4f46e5",
};

export const metadata: Metadata = {
  title: {
    default: "99tolet — India's AI Leasing OS",
    template: "%s | 99tolet",
  },
  description:
    "From vacancy to verified occupancy. AI matching, trust verification, rental pricing intelligence, and full lifecycle rental operations.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "99tolet",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.svg" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground overscroll-none">
        <a href="#main-content" className="skip-to-content">Skip to content</a>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <OrganizationJsonLd />
              <ScrollProgress sections={[]} />
              <Navbar />
              <KeyboardShortcuts />
              <MobileAppShell>
                <main id="main-content" className="flex-1">{children}</main>
              </MobileAppShell>
              {/* Footer hidden on mobile, shown on desktop */}
              <div className="hidden lg:block">
                <Footer />
              </div>
              <AIChatWidget />
              <BackToTop />
              <SocialProofToast />
              <CookieConsent />
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
