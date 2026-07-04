"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/data/blog";
import { blogPosts } from "@/data/blog";

export default function BlogDetailClient({ post }: { post: BlogPost }) {
  const related = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <>
      <article className="py-12 sm:py-16 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          {/* Back */}
          <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6 sm:mb-8 py-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
          </Link>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge variant="secondary" className="mb-4 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800">{post.category}</Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">{post.title}</h1>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 mb-6">{post.excerpt}</p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-slate-500 dark:text-slate-400 pb-6 sm:pb-8 border-b border-slate-200 dark:border-slate-800">
              <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{post.author.name}, {post.author.role}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{post.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.readTime} read</span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-6 sm:mt-8 prose prose-slate dark:prose-invert max-w-none">
            {post.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4 text-[15px]">{paragraph}</p>
            ))}
          </motion.div>

          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 dark:border-slate-700">{tag}</Badge>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-12 sm:py-16 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Related Articles</h3>
            <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
              {related.map((r) => (
                <Link key={r.id} href={`/blog/${r.slug}`} className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-lg dark:hover:shadow-indigo-500/10 transition-all hover:-translate-y-1">
                  <Badge variant="secondary" className="text-xs mb-2 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">{r.category}</Badge>
                  <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">{r.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{r.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
