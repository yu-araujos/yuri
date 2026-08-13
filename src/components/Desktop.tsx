"use client";

import React from "react";
import { Dock } from "./Dock";
import { TetrisText } from "./TetrisText";
import { Starfield } from "./Starfield";
import { Window } from './Window';
import { useOSStore } from '@/store/useOSStore';
import { AnimatePresence, motion } from 'framer-motion';

export function Desktop() {
  const { windows } = useOSStore();
  const windowKeys = Object.keys(windows) as Array<keyof typeof windows>;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-light-surface dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 font-mono transition-colors duration-500">
      <Starfield />

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0">
        <TetrisText
          text="YURI SILVA"
          className="text-5xl md:text-8xl text-brand tracking-widest text-center leading-tight"
        />
        <p className="mt-4 text-zinc-600 dark:text-zinc-400 font-mono text-sm tracking-widest uppercase">
          Software Engineer
        </p>
      </div>

      <AnimatePresence>
        {Object.values(windows).some(w => w.isMaximized && w.isOpen && !w.isMinimized) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-y-0 right-0 w-[calc(100%-4rem)] bg-zinc-950 z-0"
          />
        )}
      </AnimatePresence>

      {windowKeys.map((id) => (
        <Window key={id} id={id} />
      ))}

      <Dock />
    </div>
  );
}
