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
            initial={{ y: -600, opacity: 0, rotate: -10 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 10,
              mass: 1.2,
              delay: i * 0.06,
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
