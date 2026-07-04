"use client";

import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/data/faqs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { FAQJsonLd } from "@/components/shared/JsonLd";

export default function FAQPage() {
  const categories = [...new Set(faqs.map((f) => f.category))];

  return (
    <>
      <FAQJsonLd faqs={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />

      <section className="py-20 sm:py-24 md:py-32 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 relative">
        <div className="absolute inset-0 bg-grid opacity-30 dark:opacity-10" />
        <div className="relative mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h1>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">Everything you need to know about 99tolet. Can&apos;t find what you&apos;re looking for? Reach out to our support team.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          {categories.map((cat) => (
            <div key={cat} className="mb-8 sm:mb-10">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">{cat}</h2>
              <Accordion className="space-y-3">
                {faqs.filter((f) => f.category === cat).map((faq) => (
                  <AccordionItem key={faq.id} className="bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 rounded-xl px-5 sm:px-6 data-open:bg-indigo-50/30 data-open:dark:bg-indigo-950/20 data-open:border-indigo-200/50 data-open:dark:border-indigo-800/50 transition-colors">
                    <AccordionTrigger className="text-sm font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 py-4">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pb-4">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          <div className="text-center mt-10 sm:mt-12 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Still have questions?</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Our team is ready to help you with any questions about 99tolet.</p>
            <Button className="bg-gradient-to-r from-indigo-600 to-violet-600 gap-2 w-full sm:w-auto" asChild>
              <Link href="/contact"><MessageCircle className="w-4 h-4" /> Contact Support</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
