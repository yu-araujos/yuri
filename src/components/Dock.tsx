"use client";

import React from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { User, FolderOpen, Mail, FolderGit2 } from "lucide-react";
import { useOSStore, AppId } from "@/store/useOSStore";
import { cn } from "@/lib/utils";

const APPS = [
  { id: "about" as AppId, label: "About", icon: User },
  { id: "projects" as AppId, label: "Projects", icon: FolderGit2 },
  { id: "contact" as AppId, label: "Contact", icon: Mail },
];

export function Dock() {
  const { openApp, windows, returnToDesktop } = useOSStore();
  const mouseX = useMotionValue(Infinity);

  const isAnyMaximized = Object.values(windows).some((w) => w.isMaximized && w.isOpen && !w.isMinimized);

  return (
    <motion.div
      layout
      className={cn(
        "z-50 flex",
        isAnyMaximized
          ? "absolute left-0 top-0 h-full w-16 bg-zinc-950/80 border-r border-zinc-800/60 backdrop-blur-xl flex-col items-center py-6 shadow-2xl"
          : "absolute bottom-8 left-1/2 -translate-x-1/2",
      )}
      onMouseMove={(e) => !isAnyMaximized && mouseX.set(e.pageX)}
      onMouseLeave={() => !isAnyMaximized && mouseX.set(Infinity)}
    >
      {isAnyMaximized && (
        <motion.button
          onClick={returnToDesktop}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-yellow-200 text-xl mb-8 tracking-tighter hover:text-yellow-100 transition-colors cursor-pointer"
          style={{ fontFamily: "var(--font-pixel)" }}
        >
          YS
        </motion.button>
      )}

      <motion.div
        layout
        className={cn(
          "flex gap-6",
          isAnyMaximized
            ? "flex-col items-center w-full"
            : "h-24 items-end rounded-3xl bg-zinc-950/60 border border-zinc-800/60 px-8 pb-4 backdrop-blur-xl shadow-2xl",
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

  // Efeito de zoom estilo Mac só se aplica quando está no modo horizontal
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
          "absolute px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl z-10",
          isVertical ? "left-14 top-1/2 -translate-y-1/2" : "-top-14",
        )}
      >
        {app.label}
      </div>

      <motion.button
        ref={ref}
        layout
        style={
          isVertical
            ? { width: 44, height: 44 }
            : { width: widthSpring, height: widthSpring }
        }
        onClick={onClick}
        className={cn(
          "flex items-center justify-center rounded-2xl bg-zinc-900/90 border border-zinc-700/50 shadow-lg transition-colors hover:bg-zinc-800 hover:border-zinc-600",
        )}
      >
        <app.icon className="w-1/2 h-1/2 text-yellow-200" />
      </motion.button>

      <motion.div
        layout
        className={cn(
          "absolute rounded-full transition-opacity",
          isVertical
            ? "-left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5"
            : "-bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5",
          isOpen ? "bg-yellow-200 opacity-100" : "bg-transparent opacity-0",
        )}
      />
    </div>
  );
}
