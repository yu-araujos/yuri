"use client";

import React from "react";
import { Dock } from "./Dock";
import { MobileNav } from "./MobileNav";
import { TetrisText } from "./TetrisText";
import { Starfield } from "./Starfield";
import { Window } from "./Window";
import { SpaceGame } from "./game/SpaceGame";
import { useOSStore } from "@/store/useOSStore";
import { AnimatePresence, motion } from "framer-motion";
import { Gamepad2 } from "lucide-react";

export function Desktop() {
  const { windows, isArcadeMode, isWarping, startArcadeMode } = useOSStore();
  const windowKeys = Object.keys(windows).filter(
    (k) => k !== "arcade",
  ) as Array<keyof typeof windows>;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-light-surface dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 font-mono transition-colors duration-500">
      <Starfield />

      <motion.div
        animate={{
          opacity: isArcadeMode || isWarping ? 0 : 1,
          y: isArcadeMode || isWarping ? -15 : 0,
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0"
      >
        <TetrisText
          text="YURI SILVA"
          className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl text-brand tracking-wider sm:tracking-widest text-center leading-tight px-4 max-w-[92vw]"
        />
        <p className="mt-2 sm:mt-4 text-zinc-600 dark:text-zinc-400 font-mono text-xs sm:text-sm tracking-widest uppercase text-center px-4">
          Software Engineer
        </p>
        <button
          onClick={startArcadeMode}
          className="pointer-events-auto mt-4 px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand/30 text-brand text-xs font-mono font-semibold hover:bg-brand/20 transition-all flex items-center space-x-2 cursor-pointer shadow-sm"
        >
          <Gamepad2 className="w-3.5 h-3.5 text-brand" />
          <span>Arcade Mode</span>
        </button>
      </motion.div>

      <AnimatePresence>
        {Object.values(windows).some(
          (w) => w.isMaximized && w.isOpen && !w.isMinimized,
        ) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-y-0 right-0 w-full md:w-[calc(100%-4rem)] bg-stone-50 dark:bg-zinc-950 z-0"
          />
        )}
      </AnimatePresence>

      <MobileNav />

      {windowKeys.map((id) => (
        <Window key={id} id={id} />
      ))}

      <AnimatePresence>
        {isArcadeMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0 z-40"
          >
            <SpaceGame />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hidden md:block">
        <Dock />
      </div>
    </div>
  );
}
