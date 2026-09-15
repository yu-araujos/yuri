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
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl md:rounded-3xl border border-border-base bg-surface p-6 md:p-8 transition-all duration-300 hover:border-subtle-fg hover:shadow-xl hover:shadow-black/40 ${className}`}
    >
      {(subtitle || badge) && (
        <div className="flex items-center justify-between gap-4 border-b border-border-base/50 pb-4">
          <div className="flex items-center gap-2">
            {subtitle && (
              <span className="font-mono text-xs text-subtle-ys tracking-wide">
                {subtitle}
              </span>
            )}
          </div>

          {badge && (
            <div className="inline-flex items-center gap-2 rounded-full bg-surface-mid/80 px-3 py-1 border border-border-base/50 shrink-0">
              {showBadgeDot && (
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
              )}
              <span className="font-mono text-[10px] uppercase tracking-wider text-fg font-medium whitespace-nowrap">
                {badge}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="my-6">
        {title && (
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-fg uppercase">
            {title}
          </h2>
        )}

        {description && (
          <p className="mt-3 text-sm md:text-base leading-relaxed text-muted-ys max-w-xl">
            {description}
          </p>
        )}

        {children && <div className="mt-4">{children}</div>}
      </div>

      {showFooterAction && (
        <motion.div
          variants={footerWrapperVariants}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="overflow-hidden"
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
