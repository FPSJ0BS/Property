import LegalLayout from "@/components/shared/LegalLayout";

export const metadata = { title: "Refund & Cancellation Policy" };

export default function RefundPolicyPage() {
  return (
    <LegalLayout title="Refund & Cancellation Policy" lastUpdated="April 1, 2026">
      <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <p>This policy outlines the refund and cancellation terms for paid services on the 99tolet platform.</p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white !mt-8">1. Subscription Plans</h2>
        <p><strong className="dark:text-white">Monthly Plans:</strong> Can be cancelled at any time. No refund for the current billing period. Service continues until the end of the paid period.</p>
        <p><strong className="dark:text-white">Annual Plans:</strong> Can be cancelled with a pro-rated refund for unused months, minus a 10% early cancellation fee. Minimum 3-month commitment required.</p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white !mt-8">2. Verification Services</h2>
        <p>Fees paid for TrustShield&trade; verification are non-refundable once the verification process has been initiated. If verification cannot be completed due to our technical issues, a full refund will be provided within 7 business days.</p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white !mt-8">3. Enterprise Plans</h2>
        <p>Custom enterprise agreements have specific cancellation and refund terms as outlined in individual service agreements. Contact your account manager for details.</p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white !mt-8">4. How to Request a Refund</h2>
        <p>Submit refund requests to <strong className="dark:text-white">billing@99tolet.com</strong> with your account details and reason for the request. Refunds are processed within 7&ndash;10 business days to the original payment method.</p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white !mt-8">5. Exceptions</h2>
        <p>Refunds will not be provided for: services already consumed, promotional or discounted plans (unless otherwise stated), or accounts suspended due to policy violations.</p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-white !mt-8">6. Contact</h2>
        <p>For billing and refund queries, contact <strong className="dark:text-white">billing@99tolet.com</strong> or call +91 141-400-9999.</p>
      </div>
    </LegalLayout>
  );
}
