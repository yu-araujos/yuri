"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TetrisTextProps {
  text: string;
  className?: string;
}

export function TetrisText({ text, className }: TetrisTextProps) {
  const letters = text.split("");

  return (
    <div
      className={cn("flex", className)}
      style={{ fontFamily: "var(--font-pixel)" }}
    >
      {letters.map((letter, i) => {
        if (letter === " ") {
          return <span key={i} className="w-4 md:w-8"></span>;
        }

        return (
          <motion.span
            key={i}
            initial={{ y: -800, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "tween",
              ease: "linear",
              duration: 0.4 + Math.random() * 0.3,
            }}
            className="inline-block"
          >
            {letter}
          </motion.span>
        );
      })}
    </div>
  );
}
