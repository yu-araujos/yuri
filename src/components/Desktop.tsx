"use client";

import React from "react";
import { Dock } from "./Dock";
import { TetrisText } from "./TetrisText";
import { Starfield } from "./Starfield";
// import { Window } from './Window'; // Descomentaremos quando criarmos as Janelas
// import { useOSStore } from '@/store/useOSStore';

export function Desktop() {
  // const { activeWindow } = useOSStore(); // Usaremos isso no futuro para controle

  return (
    <div className="relative w-full h-screen overflow-hidden bg-zinc-950 text-zinc-300 font-mono">
      <Starfield />
      <div className="absolute inset-0 bg-black/40 pointer-events-none z-0" />

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0">
        <TetrisText
          text="YURI SILVA"
          className="text-5xl md:text-8xl text-yellow-200/80 tracking-widest text-center leading-tight"
        />
        <p className="mt-4 text-zinc-400 font-mono text-sm tracking-widest uppercase">
          Software Engineer
        </p>
      </div>

      <Dock />
    </div>
  );
}
