import { MetadataRoute } from "next";
import { properties } from "@/data/properties";
import { blogPosts } from "@/data/blog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://99tolet.com";

  const staticPages = [
    "", "/about", "/product", "/solutions", "/discover", "/contact",
    "/careers", "/pricing", "/faq", "/blog", "/support",
    "/privacy-policy", "/terms", "/cookies", "/refund-policy",
    "/coming-soon",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const propertyPages = properties.map((p) => ({
    url: `${baseUrl}/property/${p.slug}`,
    lastModified: new Date(p.postedDate),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  const blogPages = blogPosts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...propertyPages, ...blogPages];
}
