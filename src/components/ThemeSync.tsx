"use client";

import { useEffect } from "react";
import { useOSStore } from "@/store/useOSStore";

export function ThemeSync() {
  const isDark = useOSStore((s) => s.isDark);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  return null;
}
