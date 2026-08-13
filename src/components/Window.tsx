"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppId, useOSStore } from "@/store/useOSStore";
import { cn } from "@/lib/utils";
import { AboutApp } from "./apps/AboutApp";
import { ContactApp } from "./apps/ContactApp";

import { X, Minus, Maximize2 } from "lucide-react";

interface WindowProps {
  id: AppId;
}

export function Window({ id }: WindowProps) {
  const windowState = useOSStore((state) => state.windows[id]);
  const { closeApp, minimizeApp, maximizeApp, focusApp } = useOSStore();
  const { isMinimized, isMaximized } = windowState;
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const titleMap: Record<AppId, string> = {
    about: "About",
    projects: "Projects",
    contact: "contact.sh",
  };

  return (
    <AnimatePresence>
      {windowState.isOpen && !isMinimized && (
        <motion.div
          layout={isDesktop}
          drag={isDesktop && !isMaximized}
          dragMomentum={false}
          onMouseDown={() => focusApp(id)}
          initial={{ opacity: 0, scale: isDesktop && !isMaximized ? 0.95 : 1 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
          }}
          exit={{ opacity: 0, scale: isDesktop && !isMaximized ? 0.95 : 1 }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          style={{
            zIndex: windowState.zIndex,
          }}
          className={cn(
            "fixed flex flex-col overflow-hidden transition-colors duration-500",
            !isDesktop
              ? "inset-0 w-full h-full rounded-none border-none shadow-none bg-light-surface dark:bg-zinc-950 pt-[calc(3.75rem+env(safe-area-inset-top,0px))]"
              : isMaximized
              ? "inset-y-0 right-0 w-[calc(100%-4rem)] h-full rounded-none border-none bg-stone-50 dark:bg-zinc-950"
              : id === "contact"
              ? "top-[20%] left-[30%] w-full max-w-xl h-auto rounded-xl bg-zinc-950 border border-zinc-800 shadow-2xl"
              : "top-[12%] left-[12%] w-[76%] h-[72%] max-w-5xl rounded-xl border border-stone-200 dark:border-zinc-700/50 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-2xl",
          )}
        >
          {isMaximized && (
            <div className="absolute top-6 right-8 flex items-center space-x-3 z-50">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeApp(id);
                }}
                className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center group transition-colors"
              >
                <X className="w-2.5 h-2.5 text-red-950 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  minimizeApp(id);
                }}
                className="w-3.5 h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center group transition-colors"
              >
                <Minus className="w-2.5 h-2.5 text-yellow-950 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  maximizeApp(id);
                }}
                className="w-3.5 h-3.5 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center group transition-colors"
              >
                <Maximize2 className="w-2.5 h-2.5 text-green-950 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          )}

          <AnimatePresence>
            {!isMaximized && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={cn(
                  "hidden md:flex items-center justify-between px-4 py-3 cursor-move select-none transition-colors duration-500",
                  id === "contact"
                    ? "bg-zinc-900 border-b border-zinc-800 text-zinc-300"
                    : "bg-stone-100/80 dark:bg-zinc-950/80 border-b border-stone-200 dark:border-zinc-800",
                )}
                onDoubleClick={() => id !== "contact" && maximizeApp(id)}
              >
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeApp(id);
                    }}
                    className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center group transition-colors"
                  >
                    <X className="w-2.5 h-2.5 text-red-950 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      minimizeApp(id);
                    }}
                    className="w-3.5 h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center group transition-colors"
                  >
                    <Minus className="w-2.5 h-2.5 text-yellow-950 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <button
                    disabled={id === "contact"}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (id !== "contact") maximizeApp(id);
                    }}
                    className={cn(
                      "w-3.5 h-3.5 rounded-full flex items-center justify-center transition-colors",
                      id === "contact"
                        ? "bg-zinc-700/40 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600 group",
                    )}
                  >
                    {id !== "contact" && (
                      <Maximize2 className="w-2.5 h-2.5 text-green-950 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                </div>
                <div className="flex-1 text-center font-mono text-xs tracking-widest text-zinc-400 font-medium uppercase">
                  {titleMap[id]}
                </div>
                <div className="w-16" />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            layout
            className={cn(
              "flex-1 overflow-y-auto font-sans text-zinc-700 dark:text-zinc-300 transition-colors duration-500",
              id === "contact"
                ? "bg-zinc-950 text-zinc-100 px-5 pt-6 pb-12 md:p-6"
                : isMaximized
                ? "bg-light-surface dark:bg-zinc-950 p-6 md:p-16"
                : "bg-light-surface dark:bg-zinc-950 md:bg-stone-50/80 md:dark:bg-zinc-900/50 px-5 pt-6 pb-12 md:p-8",
            )}
          >
            <motion.div
              initial={false}
              animate={{ y: isMaximized ? 20 : 0, opacity: 1 }}
              className="max-w-4xl mx-auto"
            >
              <h2
                className={cn(
                  "font-mono text-brand uppercase tracking-wider",
                  id === "contact"
                    ? "block md:hidden text-2xl mb-4"
                    : isMaximized
                    ? "text-3xl md:text-5xl mb-6 md:mb-10"
                    : "text-2xl md:text-3xl mb-4 md:mb-6",
                )}
              >
                {titleMap[id]}
              </h2>
              {id === "about" ? (
                <AboutApp />
              ) : id === "contact" ? (
                <ContactApp />
              ) : (
                <div className="space-y-4">
                  <p>Welcome to the {titleMap[id]} section.</p>
                  <p className="text-zinc-500">
                    (The real content for this tab will be added here soon...)
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
