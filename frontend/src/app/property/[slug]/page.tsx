import { notFound } from "next/navigation";
import { Metadata } from "next";
import PropertyDetailClient from "./PropertyDetailClient";
import { properties, getPropertyBySlug } from "@/data/properties";
import { PropertyJsonLd } from "@/components/shared/JsonLd";

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return {};
  return {
    title: property.title,
    description: property.description,
  };
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();
  return (
    <>
      <PropertyJsonLd property={property} />
      <PropertyDetailClient property={property} />
    </>
  );
}
