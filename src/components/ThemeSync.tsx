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

    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta");
      metaThemeColor.setAttribute("name", "theme-color");
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.setAttribute("content", themeColor);

    let metaAppleStatus = document.querySelector(
      'meta[name="apple-mobile-web-app-status-bar-style"]'
    );
    if (!metaAppleStatus) {
      metaAppleStatus = document.createElement("meta");
      metaAppleStatus.setAttribute(
        "name",
        "apple-mobile-web-app-status-bar-style"
      );
      document.head.appendChild(metaAppleStatus);
    }
    metaAppleStatus.setAttribute(
      "content",
      isDark ? "black-translucent" : "default"
    );
  }, [isDark]);

  return null;
}
