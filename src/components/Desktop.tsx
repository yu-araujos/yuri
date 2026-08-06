"use client";

import React from "react";
import { Dock } from "./Dock";
// import { Window } from './Window'; // Descomentaremos quando criarmos as Janelas
// import { useOSStore } from '@/store/useOSStore';

export function Desktop() {
  // const { activeWindow } = useOSStore(); // Usaremos isso no futuro para controle

  return (
    <div className="relative w-full h-screen overflow-hidden bg-zinc-950 text-zinc-300 font-mono">
      <div className="absolute inset-0 bg-black pointer-events-none" />
      <Dock />
    </div>
  );
}
