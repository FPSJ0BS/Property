import "./globals.css";

export const metadata = {
  title: "Property Management",
  description: "Property management application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
