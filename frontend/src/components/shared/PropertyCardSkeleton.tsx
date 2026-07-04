"use client";

export default function PropertyCardSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
      {/* Image area */}
      <div className="skeleton h-44 sm:h-56 w-full" />

      {/* Content area */}
      <div className="p-4 space-y-3">
        {/* Title - 2 lines */}
        <div className="space-y-2">
          <div className="skeleton h-4 w-3/4" />
          <div className="skeleton h-4 w-1/2" />
        </div>

        {/* Price - wider bar */}
        <div className="skeleton h-5 w-2/3" />

        {/* Specs - 3 small bars */}
        <div className="flex gap-3">
          <div className="skeleton h-3 w-14" />
          <div className="skeleton h-3 w-14" />
          <div className="skeleton h-3 w-16" />
        </div>

        {/* Tags - 2 small pills */}
        <div className="flex gap-2">
          <div className="skeleton h-6 w-16 rounded-full" />
          <div className="skeleton h-6 w-20 rounded-full" />
        </div>

        {/* Bottom bar */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="skeleton h-4 w-full" />
        </div>
      </div>
    </div>
  );
}

export function PropertyGridSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <PropertyCardSkeleton key={i} />
      ))}
    </div>
  );
}
