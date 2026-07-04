"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/data/faqs";
import SectionHeading from "@/components/shared/SectionHeading";

export default function FAQPreview() {
  return (
    <section className="py-20 sm:py-36 bg-white dark:bg-slate-950 relative">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="FAQ"
          title="Common questions"
          subtitle="Quick answers to the most frequently asked questions about 99tolet."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 sm:mt-12"
        >
          <Accordion className="space-y-3">
            {faqs.slice(0, 5).map((faq) => (
              <AccordionItem
                key={faq.id}
                className="bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-700 rounded-xl px-5 sm:px-6 data-open:bg-indigo-50/30 dark:data-open:bg-indigo-950/20 data-open:border-indigo-200/50 dark:data-open:border-indigo-800/40 transition-all duration-300 hover:border-slate-300/60 dark:hover:border-slate-600"
              >
                <AccordionTrigger className="text-[14px] font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 py-4.5 font-display min-h-[48px]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <div className="mt-10 text-center">
          <Button
            variant="outline"
            className="gap-2 border-indigo-200/80 dark:border-indigo-800/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 hover:border-indigo-300 dark:hover:border-indigo-700 font-semibold transition-all duration-300 hover:-translate-y-px"
            asChild
          >
            <Link href="/faq">
              View All FAQs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
