"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, AtSign, FolderGit2, Sun, Moon } from "lucide-react";
import { useOSStore, AppId } from "@/store/useOSStore";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "about" as AppId, label: "About", icon: User, disabled: false },
  { id: "projects" as AppId, label: "Projects", tag: "Soon", icon: FolderGit2, disabled: true },
  { id: "contact" as AppId, label: "Contact", icon: AtSign, disabled: false },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { openApp, windows, returnToDesktop, toggleTheme, isDark } = useOSStore();

  const activeAppId = Object.values(windows).find(
    (w) => w.isOpen && !w.isMinimized
  )?.id;

  const handleSelect = (id: AppId, disabled?: boolean) => {
    if (disabled) return;
    openApp(id);
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-stone-50/80 dark:bg-zinc-950/80 border-b border-stone-200 dark:border-zinc-800/80 backdrop-blur-xl transition-colors duration-500">
        <button
          onClick={() => {
            returnToDesktop();
            setIsOpen(false);
          }}
          className="text-brand text-lg font-bold tracking-tighter hover:opacity-80 transition-opacity"
          style={{ fontFamily: "var(--font-pixel)" }}
        >
          YS
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-stone-200/80 dark:bg-zinc-900 border border-stone-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-brand" /> : <Moon className="w-4 h-4 text-brand" />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl bg-stone-200/80 dark:bg-zinc-900 border border-stone-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 transition-colors"
            aria-label="Open menu"
          >
            {isOpen ? <X className="w-5 h-5 text-brand" /> : <Menu className="w-5 h-5 text-brand" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-stone-50/95 dark:bg-zinc-950/95 backdrop-blur-2xl flex flex-col justify-between p-6 pt-20 font-sans"
          >
            <div className="space-y-6">
              <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest px-2">
                Navigation
              </p>

              <nav className="space-y-2">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeAppId === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.id, item.disabled)}
                      disabled={item.disabled}
                      className={cn(
                        "w-full flex items-center justify-between p-4 rounded-2xl border transition-all text-left font-mono text-sm",
                        isActive
                          ? "bg-brand/15 border-brand/40 text-brand font-bold"
                          : item.disabled
                          ? "bg-stone-100/50 dark:bg-zinc-900/30 border-stone-200/50 dark:border-zinc-800/40 text-zinc-400 dark:text-zinc-600 opacity-60 cursor-not-allowed"
                          : "bg-stone-100/80 dark:bg-zinc-900/80 border-stone-200 dark:border-zinc-800/80 text-zinc-900 dark:text-zinc-100 hover:border-brand/40"
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={cn("w-5 h-5", isActive ? "text-brand" : "text-zinc-500")} />
                        <span>{item.label}</span>
                      </div>

                      {item.tag && (
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-stone-200 dark:bg-zinc-800 text-zinc-500">
                          {item.tag}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-4 rounded-2xl bg-stone-100 dark:bg-zinc-900/60 border border-stone-200 dark:border-zinc-800/60 space-y-1 text-xs font-mono text-zinc-500">
              <div className="flex items-center space-x-2 text-zinc-900 dark:text-zinc-200 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Porto, Portugal</span>
              </div>
              <p className="text-[11px] text-zinc-400">Available for new opportunities</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
