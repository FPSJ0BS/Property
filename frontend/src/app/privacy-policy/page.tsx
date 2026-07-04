import LegalLayout from "@/components/shared/LegalLayout";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="April 1, 2026">
      <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <p>99tolet Technologies Pvt. Ltd. (&quot;99tolet&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our platform.</p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white !mt-8">1. Information We Collect</h2>
        <p><strong className="dark:text-white">Personal Information:</strong> Name, email address, phone number, Aadhaar/PAN details (for verification), address, and payment information when you create an account or use our services.</p>
        <p><strong className="dark:text-white">Property Information:</strong> Property details, images, ownership documents, and location data when you list a property on our platform.</p>
        <p><strong className="dark:text-white">Usage Data:</strong> Search queries, browsing patterns, device information, IP address, and cookies to improve our AI matching and user experience.</p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white !mt-8">2. How We Use Your Information</h2>
        <p>We use collected information to: provide AI-powered property matching, process verification through TrustShield&trade;, generate pricing intelligence through RentIQ&trade;, manage post-lease operations through RentalOS&trade;, communicate with you about services, improve our platform, and comply with legal obligations.</p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white !mt-8">3. Data Security</h2>
        <p>We implement industry-standard security measures including encryption, access controls, and regular security audits. Verification documents are stored in encrypted, access-controlled environments and are never shared without explicit consent.</p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white !mt-8">4. Third-Party Sharing</h2>
        <p>We do not sell your personal data. We may share information with: verification service providers, payment processors, cloud infrastructure providers, and as required by Indian law enforcement or regulatory authorities.</p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white !mt-8">5. Your Rights</h2>
        <p>You have the right to: access your personal data, request correction of inaccurate data, request deletion of your data (subject to legal retention requirements), withdraw consent for data processing, and lodge a complaint with the relevant data protection authority.</p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white !mt-8">6. Contact Us</h2>
        <p>For privacy-related questions, contact our Data Protection Officer at <strong className="dark:text-white">privacy@99tolet.com</strong> or write to us at our registered office in Vaishali Nagar, Jaipur, Rajasthan 302021.</p>
      </div>
    </LegalLayout>
  );
}
