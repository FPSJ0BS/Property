"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/data/blog";

export default function BlogPage() {
  const featured = blogPosts.find((p) => p.featured);
  const rest = blogPosts.filter((p) => p !== featured);

  return (
    <>
      <section className="py-20 sm:py-24 md:py-32 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 relative">
        <div className="absolute inset-0 bg-grid opacity-30 dark:opacity-10" />
        <div className="relative mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wide uppercase text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 rounded-full border border-indigo-100 dark:border-indigo-800 mb-6">Blog & Insights</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">Rental Intelligence</h1>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">Market analysis, product deep-dives, and insights on the future of AI-powered leasing in India.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          {/* Featured */}
          {featured && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 sm:mb-16">
              <Link href={`/blog/${featured.slug}`} className="group">
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:shadow-indigo-500/5 dark:hover:shadow-indigo-500/10 transition-all">
                  <div className="h-56 sm:h-64 md:h-auto bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/30 dark:to-violet-900/30 flex items-center justify-center">
                    <span className="text-6xl">{"\u{1F4CA}"}</span>
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col justify-center">
                    <Badge variant="secondary" className="w-fit mb-3 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800">{featured.category}</Badge>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-3">{featured.title}</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{featured.excerpt}</p>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-400 dark:text-slate-500">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" />{featured.author.name}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{featured.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {rest.map((post, i) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Link href={`/blog/${post.slug}`} className="group">
                  <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg hover:shadow-indigo-500/5 dark:hover:shadow-indigo-500/10 transition-all hover:-translate-y-1">
                    <div className="h-40 bg-gradient-to-br from-slate-100 to-indigo-50 dark:from-slate-800 dark:to-indigo-950/30 flex items-center justify-center">
                      <span className="text-4xl">{"\u{1F4DD}"}</span>
                    </div>
                    <div className="p-5">
                      <Badge variant="secondary" className="text-xs mb-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">{post.category}</Badge>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">{post.excerpt}</p>
                      <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
                        <span>{post.author.name}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
