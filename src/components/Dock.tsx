"use client";

import React from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { User, AtSign, FolderGit2, Sun, Moon } from "lucide-react";
import { useOSStore, AppId } from "@/store/useOSStore";
import { cn } from "@/lib/utils";

const APPS = [
  { id: "about" as AppId, label: "About", icon: User, disabled: false },
  { id: "projects" as AppId, label: "Projects", icon: FolderGit2, disabled: false },
  { id: "contact" as AppId, label: "Contact", icon: AtSign, disabled: false },
];

export function Dock() {
  const {
    openApp,
    windows,
    returnToDesktop,
    toggleTheme,
    isDark,
    isArcadeMode,
    isWarping,
  } = useOSStore();
  const mouseX = useMotionValue(Infinity);

  if (isArcadeMode || isWarping) return null;

  const isAnyMaximized = Object.values(windows).some(
    (w) => w.isMaximized && w.isOpen && !w.isMinimized,
  );

  return (
    <motion.div
      layout
      className={cn(
        "z-50 flex max-w-[95vw]",
        isAnyMaximized
          ? "absolute left-0 top-0 h-full w-14 md:w-16 bg-white/80 dark:bg-zinc-950/80 border-r border-stone-200 dark:border-zinc-800/60 backdrop-blur-xl flex-col items-center py-4 md:py-6 shadow-2xl"
          : "absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2",
      )}
      onMouseMove={(e) => !isAnyMaximized && mouseX.set(e.pageX)}
      onMouseLeave={() => !isAnyMaximized && mouseX.set(Infinity)}
    >
      {isAnyMaximized && (
        <motion.button
          onClick={returnToDesktop}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-brand text-lg md:text-xl mb-6 md:mb-8 tracking-tighter hover:text-brand/70 transition-colors cursor-pointer"
          style={{ fontFamily: "var(--font-pixel)" }}
        >
          YS
        </motion.button>
      )}

      <motion.div
        layout
        className={cn(
          "flex transition-colors duration-500",
          isAnyMaximized
            ? "flex-col items-center w-full gap-4 md:gap-6"
            : "h-20 sm:h-24 items-end rounded-2xl sm:rounded-3xl bg-white/70 dark:bg-zinc-950/60 border border-stone-200 dark:border-zinc-800/60 px-4 sm:px-8 pb-3 sm:pb-4 backdrop-blur-xl shadow-2xl gap-3 sm:gap-6",
        )}
      >
        {APPS.map((app) => (
          <DockItem
            key={app.id}
            app={app}
            mouseX={mouseX}
            isOpen={windows[app.id].isOpen}
            isVertical={isAnyMaximized}
            onClick={() => openApp(app.id)}
          />
        ))}

        {!isAnyMaximized && (
          <>
            <div className="w-px h-10 bg-stone-300 dark:bg-zinc-700/50 rounded-full self-end mb-1" />
            <ThemeToggle
              isDark={isDark}
              onToggle={toggleTheme}
              mouseX={mouseX}
            />
          </>
        )}

        {isAnyMaximized && (
          <button
            onClick={toggleTheme}
            className="mt-auto mb-2 w-9 h-9 flex items-center justify-center rounded-xl bg-stone-200/80 dark:bg-zinc-800/60 border border-stone-300 dark:border-zinc-700/40 text-zinc-500 dark:text-zinc-400 hover:text-brand hover:border-brand/40 transition-all"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDark ? "moon" : "sun"}
                initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}

function DockItem({
  app,
  mouseX,
  isOpen,
  isVertical,
  onClick,
}: {
  app: (typeof APPS)[0];
  mouseX: any;
  isOpen: boolean;
  isVertical: boolean;
  onClick: () => void;
}) {
  const ref = React.useRef<HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [56, 100, 56]);
  const widthSpring = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <div
      className={cn(
        "relative flex items-center justify-center group",
        isVertical ? "w-full" : "flex-col",
      )}
    >
      <div
        className={cn(
          "absolute px-3 py-1.5 bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl z-10",
          isVertical ? "left-14 top-1/2 -translate-y-1/2" : "-top-14",
        )}
      >
        {app.label}
      </div>

      <motion.button
        ref={ref}
        layout
        disabled={app.disabled}
        style={
          isVertical
            ? { width: 44, height: 44 }
            : { width: widthSpring, height: widthSpring }
        }
        onClick={() => !app.disabled && onClick()}
        className={cn(
          "flex items-center justify-center rounded-2xl bg-stone-200/80 dark:bg-zinc-900/90 border border-stone-300 dark:border-zinc-700/50 shadow-lg transition-colors",
          app.disabled
            ? "opacity-50 cursor-not-allowed border-dashed"
            : "hover:bg-stone-300/60 dark:hover:bg-zinc-800 hover:border-stone-400 dark:hover:border-zinc-600",
        )}
      >
        <app.icon
          className={cn(
            "w-1/2 h-1/2",
            app.disabled ? "text-zinc-400 dark:text-zinc-500" : "text-brand",
          )}
        />
      </motion.button>

      <motion.div
        layout
        className={cn(
          "absolute rounded-full transition-opacity",
          isVertical
            ? "-left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5"
            : "-bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5",
          isOpen ? "bg-brand opacity-100" : "bg-transparent opacity-0",
        )}
      />
    </div>
  );
}

function ThemeToggle({
  isDark,
  onToggle,
  mouseX,
}: {
  isDark: boolean;
  onToggle: () => void;
  mouseX: any;
}) {
  const ref = React.useRef<HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [56, 100, 56]);
  const widthSpring = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <div className="relative flex flex-col items-center justify-center group">
      <div className="absolute -top-14 px-3 py-1.5 bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl z-10">
        {isDark ? "Light mode" : "Dark mode"}
      </div>

      <motion.button
        ref={ref}
        layout
        style={{ width: widthSpring, height: widthSpring }}
        onClick={onToggle}
        className="flex items-center justify-center rounded-2xl bg-stone-200/80 dark:bg-zinc-900/90 border border-stone-300 dark:border-zinc-700/50 shadow-lg transition-colors hover:bg-stone-300/60 dark:hover:bg-zinc-800 hover:border-stone-400 dark:hover:border-zinc-600"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
            transition={{ duration: 0.18, ease: "easeInOut" }}
            className="flex items-center justify-center w-1/2 h-1/2"
          >
            {isDark ? (
              <Sun className="w-full h-full text-brand" />
            ) : (
              <Moon className="w-full h-full text-brand" />
            )}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
