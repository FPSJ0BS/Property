import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us",
  description: "From Jaipur's trusted rental operator to India's AI Leasing OS.",
};

export default function AboutPage() {
  return <AboutClient />;
}
