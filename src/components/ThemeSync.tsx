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

    document
      .querySelectorAll('meta[name="theme-color"]')
      .forEach((el) => el.remove());

    const metaThemeColor = document.createElement("meta");
    metaThemeColor.setAttribute("name", "theme-color");
    metaThemeColor.setAttribute("content", themeColor);
    document.head.appendChild(metaThemeColor);

    document
      .querySelectorAll('meta[name="apple-mobile-web-app-status-bar-style"]')
      .forEach((el) => el.remove());

    const metaAppleStatus = document.createElement("meta");
    metaAppleStatus.setAttribute(
      "name",
      "apple-mobile-web-app-status-bar-style"
    );
    metaAppleStatus.setAttribute(
      "content",
      isDark ? "black-translucent" : "default"
    );
    document.head.appendChild(metaAppleStatus);
  }, [isDark]);

  return null;
}
