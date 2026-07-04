import LegalLayout from "@/components/shared/LegalLayout";

export const metadata = { title: "Cookie Policy" };

export default function CookiesPage() {
  return (
    <LegalLayout title="Cookie Policy" lastUpdated="April 1, 2026">
      <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <p>This Cookie Policy explains how 99tolet Technologies Pvt. Ltd. uses cookies and similar technologies on our website and platform.</p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white !mt-8">1. What Are Cookies</h2>
        <p>Cookies are small text files stored on your device when you visit our website. They help us provide a better experience by remembering your preferences, understanding usage patterns, and improving our AI services.</p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white !mt-8">2. Types of Cookies We Use</h2>
        <p><strong className="dark:text-white">Essential Cookies:</strong> Required for the platform to function. Cannot be disabled. Include authentication, security, and session management cookies.</p>
        <p><strong className="dark:text-white">Analytics Cookies:</strong> Help us understand how visitors interact with our platform. Used to improve user experience and AI matching quality.</p>
        <p><strong className="dark:text-white">Preference Cookies:</strong> Remember your settings, search preferences, and display choices for a personalized experience.</p>
        <p><strong className="dark:text-white">Marketing Cookies:</strong> Used to deliver relevant advertisements and measure campaign effectiveness. Can be disabled in cookie settings.</p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white !mt-8">3. Managing Cookies</h2>
        <p>You can manage cookie preferences through your browser settings. Disabling certain cookies may affect platform functionality, particularly AI-powered features that rely on usage data for personalization.</p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white !mt-8">4. Contact</h2>
        <p>For questions about our cookie practices, contact <strong className="dark:text-white">privacy@99tolet.com</strong>.</p>
      </div>
    </LegalLayout>
  );
}
