"use client";

import React from "react";
import { AppId, useOSStore } from "@/store/useOSStore";
import { cn } from "@/lib/utils";
import { X, Minus, Maximize2 } from "lucide-react";

interface WindowControlsProps {
  id: AppId;
  allowMaximize?: boolean;
}

export function WindowControls({ id, allowMaximize = true }: WindowControlsProps) {
  const { closeApp, minimizeApp, maximizeApp } = useOSStore();

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          closeApp(id);
        }}
        className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center group transition-colors cursor-pointer"
        aria-label="Close window"
      >
        <X className="w-2.5 h-2.5 text-red-950 opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          minimizeApp(id);
        }}
        className="w-3.5 h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center group transition-colors cursor-pointer"
        aria-label="Minimize window"
      >
        <Minus className="w-2.5 h-2.5 text-yellow-950 opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>

      <button
        disabled={!allowMaximize}
        onClick={(e) => {
          e.stopPropagation();
          if (allowMaximize) maximizeApp(id);
        }}
        className={cn(
          "w-3.5 h-3.5 rounded-full flex items-center justify-center transition-colors",
          allowMaximize
            ? "bg-green-500 hover:bg-green-600 group cursor-pointer"
            : "bg-zinc-700/40 cursor-not-allowed"
        )}
        aria-label="Maximize window"
      >
        {allowMaximize && (
          <Maximize2 className="w-2.5 h-2.5 text-green-950 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </button>
    </div>
  );
}
