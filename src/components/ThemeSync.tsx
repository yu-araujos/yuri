"use client";

import { useEffect } from "react";
import { useOSStore } from "@/store/useOSStore";

export function ThemeSync() {
  const isDark = useOSStore((s) => s.isDark);

  useEffect(() => {
    const root = document.documentElement;
    const themeColor = isDark ? "#09090b" : "#EAF4F7";

    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    root.style.backgroundColor = themeColor;
    document.body.style.backgroundColor = themeColor;

    const themeMetaElements = document.querySelectorAll('meta[name="theme-color"]');
    if (themeMetaElements.length > 0) {
      themeMetaElements.forEach((el) => {
        el.setAttribute("content", themeColor);
      });
    } else {
      const meta = document.createElement("meta");
      meta.name = "theme-color";
      meta.content = themeColor;
      document.head.appendChild(meta);
    }

    const appleStatusElements = document.querySelectorAll(
      'meta[name="apple-mobile-web-app-status-bar-style"]'
    );
    if (appleStatusElements.length > 0) {
      appleStatusElements.forEach((el) => {
        el.setAttribute("content", isDark ? "black-translucent" : "default");
      });
    } else {
      const meta = document.createElement("meta");
      meta.name = "apple-mobile-web-app-status-bar-style";
      meta.content = isDark ? "black-translucent" : "default";
      document.head.appendChild(meta);
    }
  }, [isDark]);

  return null;
}
