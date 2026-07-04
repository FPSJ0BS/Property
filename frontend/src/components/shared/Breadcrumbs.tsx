"use client";

import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="border-b border-slate-100 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4">
        <ol className="flex items-center gap-1.5 py-3 text-sm overflow-x-auto scrollbar-none">
          {/* Home */}
          <li className="flex items-center shrink-0">
            <Link
              href="/"
              className="flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="sr-only sm:not-sr-only">Home</span>
            </Link>
          </li>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={index} className="flex items-center gap-1.5 min-w-0">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0" />

                {isLast || !item.href ? (
                  <span
                    className="text-slate-700 dark:text-slate-300 font-medium truncate max-w-[200px] sm:max-w-none"
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 truncate max-w-[200px] sm:max-w-none"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
