import LegalLayout from "@/components/shared/LegalLayout";

export const metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions" lastUpdated="April 1, 2026">
      <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <p>These Terms and Conditions (&quot;Terms&quot;) govern your use of the 99tolet platform, website, and services operated by 99tolet Technologies Pvt. Ltd. By using our platform, you agree to these Terms.</p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white !mt-8">1. Platform Services</h2>
        <p>99tolet provides an AI-powered rental platform that includes property search and matching (RentalBrain&trade;), trust verification (TrustShield&trade;), pricing intelligence (RentIQ&trade;), and post-lease management (RentalOS&trade;). These services are provided on an &quot;as-is&quot; basis and are subject to availability.</p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white !mt-8">2. User Responsibilities</h2>
        <p>Users must provide accurate and truthful information during registration and verification. Any misrepresentation may result in account suspension. Users are responsible for maintaining the confidentiality of their account credentials.</p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white !mt-8">3. Property Listings</h2>
        <p>Landlords and property owners are solely responsible for the accuracy of property listings. 99tolet verifies properties through TrustShield&trade; but does not guarantee the completeness of all listing information. Verified badges indicate completion of our verification process.</p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white !mt-8">4. AI Services Disclaimer</h2>
        <p>AI Match Scores, RentIQ&trade; pricing insights, and other AI-generated recommendations are provided as decision-support tools and should not be the sole basis for rental decisions. Market conditions and individual circumstances may vary.</p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white !mt-8">5. Payments and Subscriptions</h2>
        <p>Subscription fees are billed according to the selected plan. Payments are processed through secure third-party payment gateways. Refunds are subject to our Refund Policy.</p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white !mt-8">6. Limitation of Liability</h2>
        <p>99tolet acts as a platform connecting landlords and tenants. We are not a party to any rental agreement between users. Our liability is limited to the fees paid by you for our services in the preceding 12 months.</p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white !mt-8">7. Governing Law</h2>
        <p>These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Jaipur, Rajasthan.</p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white !mt-8">8. Contact</h2>
        <p>For questions about these Terms, contact us at <strong className="dark:text-white">legal@99tolet.com</strong>.</p>
      </div>
    </LegalLayout>
  );
}
