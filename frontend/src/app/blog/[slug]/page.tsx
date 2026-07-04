import { notFound } from "next/navigation";
import { blogPosts, getBlogBySlug } from "@/data/blog";
import BlogDetailClient from "./BlogDetailClient";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();
  return <BlogDetailClient post={post} />;
}
