import { notFound } from "next/navigation";
import { areas, getAreaBySlug } from "@/data/areas";
import AreaDetailClient from "./AreaDetailClient";
import { Metadata } from "next";

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) return {};
  return { title: `${area.name} — Area Guide`, description: area.description };
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) notFound();
  return <AreaDetailClient area={area} />;
}
