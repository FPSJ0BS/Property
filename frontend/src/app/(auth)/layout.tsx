import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Account | 99tolet", template: "%s | 99tolet" },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/10">
      {children}
    </div>
  );
}
