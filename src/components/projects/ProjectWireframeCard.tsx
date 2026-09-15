"use client";

export default function ProjectWireframeCard() {
  return (
    <article
      aria-hidden
      className="flex flex-col rounded-2xl md:rounded-3xl border border-dashed border-border-base/60 bg-surface/40 p-5 md:p-6"
    >
      <div className="flex items-center justify-between gap-4 border-b border-border-base/30 pb-4">
        <div className="h-3 w-24 rounded-full bg-surface-mid/80" />
        <div className="h-5 w-8 rounded-full bg-surface-mid/60" />
      </div>

      <div className="my-6 space-y-4">
        <div className="h-8 w-3/4 rounded-lg bg-surface-mid/70" />
        <div className="space-y-2">
          <div className="h-3 w-full rounded-full bg-surface-mid/50" />
          <div className="h-3 w-2/3 rounded-full bg-surface-mid/40" />
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <div className="h-6 w-16 rounded-full bg-surface-mid/40" />
          <div className="h-6 w-20 rounded-full bg-surface-mid/35" />
          <div className="h-6 w-14 rounded-full bg-surface-mid/30" />
        </div>
      </div>

      <p className="font-mono text-[10px] uppercase tracking-widest text-subtle-ys">
        Coming soon
      </p>
    </article>
  );
}
