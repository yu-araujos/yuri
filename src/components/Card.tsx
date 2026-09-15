"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export interface CardProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  badge?: React.ReactNode;
  showBadgeDot?: boolean;
  children?: React.ReactNode;
  className?: string;
  showFooterAction?: boolean;
  footerText?: string;
  compact?: boolean;
}

export default function Card({
  title = "Card",
  subtitle,
  description,
  badge,
  showBadgeDot = false,
  children,
  className = "",
  showFooterAction = true,
  footerText = "Explorar",
  compact = false,
}: CardProps) {
  const footerWrapperVariants = {
    rest: { height: 0, opacity: 0 },
    hover: { height: 75, opacity: 1 },
  };

  const footerContentVariants = {
    rest: { y: 8 },
    hover: { y: 0 },
  };

  return (
    <motion.article
      initial="rest"
      animate="rest"
      whileHover="hover"
      className={`group relative flex flex-col overflow-hidden rounded-2xl md:rounded-3xl border border-border-base bg-surface transition-all duration-300 hover:border-subtle-fg hover:shadow-xl hover:shadow-black/40 ${compact ? "p-4 md:p-5" : "p-6 md:p-8"} ${className}`}
    >
      {(subtitle || badge) && (
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2 border-b border-border-base/50 pb-4">
          <div className="flex min-w-0 items-center gap-2">
            {subtitle && (
              <span className="font-mono text-xs text-subtle-ys tracking-wide">
                {subtitle}
              </span>
            )}
          </div>

          {badge && (
            <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-surface-mid/80 px-3 py-1 border border-border-base/50">
              {showBadgeDot && (
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
              )}
              <span className="font-mono text-[10px] uppercase tracking-wider text-fg font-medium leading-snug">
                {badge}
              </span>
            </div>
          )}
        </div>
      )}

      <div className={compact ? "mt-3" : "mt-4"}>
        {title && (
          <h2
            className={`font-display font-extrabold tracking-tight text-fg uppercase ${compact ? "text-2xl md:text-3xl" : "text-3xl sm:text-4xl md:text-5xl"}`}
          >
            {title}
          </h2>
        )}

        {description && (
          <p
            className={`mt-3 leading-relaxed text-muted-ys ${compact ? "text-xs md:text-sm" : "max-w-xl text-sm md:text-base"}`}
          >
            {description}
          </p>
        )}

        {children && <div className="mt-4">{children}</div>}
      </div>

      {showFooterAction && (
        <motion.div
          variants={footerWrapperVariants}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="mt-auto overflow-hidden"
        >
          <motion.div
            variants={footerContentVariants}
            className="flex items-center justify-between pt-4 border-t border-border-base/50"
          >
            <span className="font-mono text-xs uppercase tracking-wider text-subtle-ys">
              {footerText}
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-110 group-hover:text-fg group-hover:bg-red mr-2">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.article>
  );
}
