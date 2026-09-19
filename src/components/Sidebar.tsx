"use client";

import Link from "next/link";
import type { SidebarProps } from "@/types/sidebar";

export default function Sidebar({
  location = "PORTO · PORTUGAL · UTC+1",
  name = "YURI SILVA",
  title = "SOFTWARE ENGINEER",
  className = "",
}: SidebarProps) {
  return (
    <aside
      className={`relative flex flex-row md:flex-col items-center justify-between w-full h-14 md:h-full md:w-14 lg:w-16 border-b md:border-b-0 md:border-r border-border-base bg-bg select-none shrink-0 ${className}`}
      aria-label="Sidebar de Navegação e Identidade"
    >
      <div className="h-full w-14 md:w-full md:h-16 flex items-center justify-center border-r md:border-r-0 md:border-b border-border-base shrink-0">
        <Link
          href="/"
          className="group flex items-center justify-center w-full h-full text-white transition-opacity hover:opacity-80"
          aria-label="Página Inicial - Yuri Silva"
        >
          <span className="font-sans text-sm md:text-base font-extrabold tracking-wider leading-none text-white">
            Y<span className="text-red">·</span>S
          </span>
        </Link>
      </div>
      <div className="flex flex-1 min-w-0 items-center justify-center px-4 md:px-0 md:py-10">
        <div className="flex md:[writing-mode:vertical-rl] md:rotate-180 items-center gap-2 whitespace-nowrap min-w-0">
          <span className="truncate font-display font-extrabold text-sm sm:text-base md:text-lg lg:text-xl tracking-wide uppercase">
            <span className="text-fg">{name}</span>
          </span>
          <span className="hidden sm:inline text-subtle-ys text-sm select-none">·</span>
          <span className="hidden sm:block truncate font-display font-semibold text-xs md:text-xl tracking-wide text-muted-ys uppercase">
            {title}
          </span>
        </div>
      </div>

      <div className="hidden md:flex w-full py-6 items-center justify-center border-t border-border-base/40">
        <span className="[writing-mode:vertical-rl] rotate-180 font-mono text-[9px] md:text-[10px] tracking-[0.2em] text-subtle-ys uppercase whitespace-nowrap">
          {location.split(" · ").map((part, index, parts) => (
            <span key={part}>
              {part}
              {index < parts.length - 1 && (
                <span className="text-red"> · </span>
              )}
            </span>
          ))}
        </span>
      </div>
    </aside>
  );
}
