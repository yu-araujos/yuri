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
      className={`relative flex flex-col items-center justify-between w-14 md:w-16 border-r border-border-base bg-bg select-none shrink-0 h-full ${className}`}
      aria-label="Sidebar de Navegação e Identidade"
    >
      <div className="w-full h-14 md:h-16 flex items-center justify-center border-b border-border-base">
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
      <div className="flex-1 flex items-center justify-center py-10">
        <div className="[writing-mode:vertical-rl] rotate-180 flex items-center gap-2 whitespace-nowrap">
          <span className="font-display font-extrabold text-lg md:text-xl tracking-wide uppercase">
            <span className="text-fg">{name}</span>
          </span>
          <span className="text-subtle-ys text-sm select-none">·</span>
          <span className="font-display font-semibold text-xs md:text-xl tracking-wide text-muted-ys uppercase">
            {title}
          </span>
        </div>
      </div>

      <div className="w-full py-6 flex items-center justify-center border-t border-border-base/40">
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
