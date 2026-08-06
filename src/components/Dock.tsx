"use client";

import React from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { User, FolderOpen, Mail } from "lucide-react";
import { useOSStore, AppId } from "@/store/useOSStore";
import { cn } from "@/lib/utils";

const APPS = [
  { id: "about" as AppId, label: "About Me", icon: User },
  { id: "projects" as AppId, label: "Projects", icon: FolderOpen },
  { id: "contact" as AppId, label: "Contact", icon: Mail },
];

export function Dock() {
  const { openApp, windows } = useOSStore();
  const mouseX = useMotionValue(Infinity);

  return (
    <div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50"
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      <div className="flex h-24 items-end gap-6 rounded-3xl bg-zinc-950/60 border border-zinc-800/60 px-8 pb-4 backdrop-blur-xl shadow-2xl">
        {APPS.map((app) => (
          <DockItem
            key={app.id}
            app={app}
            mouseX={mouseX}
            isOpen={windows[app.id].isOpen}
            onClick={() => openApp(app.id)}
          />
        ))}
      </div>
    </div>
  );
}

function DockItem({
  app,
  mouseX,
  isOpen,
  onClick,
}: {
  app: (typeof APPS)[0];
  mouseX: any;
  isOpen: boolean;
  onClick: () => void;
}) {
  const ref = React.useRef<HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [56, 100, 56]);

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <div className="relative flex flex-col items-center group">
      <div className="absolute -top-14 px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl z-10">
        {app.label}
      </div>

      <motion.button
        ref={ref}
        style={{ width, height: width }}
        onClick={onClick}
        className={cn(
          "flex items-center justify-center rounded-2xl bg-zinc-900/90 border border-zinc-700/50 shadow-lg transition-colors hover:bg-zinc-800 hover:border-zinc-600",
        )}
      >
        <app.icon className="w-1/2 h-1/2 text-yellow-200" />
      </motion.button>

      <div
        className={cn(
          "absolute -bottom-3 w-1.5 h-1.5 rounded-full transition-opacity",
          isOpen ? "bg-yellow-200 opacity-100" : "bg-transparent opacity-0",
        )}
      />
    </div>
  );
}
