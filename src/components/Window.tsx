'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppId, useOSStore } from '@/store/useOSStore';
import { cn } from '@/lib/utils';

import { X, Minus, Maximize2 } from 'lucide-react';

interface WindowProps {
  id: AppId;
}

export function Window({ id }: WindowProps) {
  const windowState = useOSStore((state) => state.windows[id]);
  const { closeApp, minimizeApp, maximizeApp, focusApp } = useOSStore();
  const { isMinimized, isMaximized } = windowState;

  const titleMap: Record<AppId, string> = {
    about: 'About',
    projects: 'Projects',
    contact: 'Contact',
  };

  const offsets: Record<AppId, string> = {
    about: '0px',
    projects: '32px',
    contact: '64px',
  };

  return (
    <AnimatePresence>
      {(windowState.isOpen && !isMinimized) && (
        <motion.div
          layout
          drag={!isMaximized}
          dragMomentum={false}
          onMouseDown={() => focusApp(id)}
          initial={{ opacity: 0, scale: isMaximized ? 1 : 0.95 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: isMaximized ? 0 : undefined,
            y: isMaximized ? 0 : undefined
          }}
          exit={{ opacity: 0, scale: isMaximized ? 1 : 0.95 }}
          transition={{ type: "spring", bounce: 0, duration: 0.5 }}
          style={{ 
            zIndex: windowState.zIndex,
            ...(!isMaximized ? { marginTop: offsets[id], marginLeft: offsets[id] } : {})
          }}
          className={cn(
            "absolute flex flex-col overflow-hidden shadow-2xl ring-1 ring-white/10",
            isMaximized 
              // Website mode (Maximizado)
              ? "inset-y-0 right-0 w-[calc(100%-4rem)] rounded-none border-none bg-zinc-950"
              // Window mode (Flutuante)
              : "top-[15%] left-[15%] w-[70%] h-[70%] max-w-4xl rounded-xl bg-zinc-900/95 backdrop-blur-md border border-zinc-700/50"
          )}
        >
          {/* Controles Flutuantes no modo site (maximized) */}
          {isMaximized && (
            <div className="absolute top-6 right-8 flex items-center space-x-3 z-50">
              <button 
                onClick={(e) => { e.stopPropagation(); closeApp(id); }}
                className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center group transition-colors"
              >
                <X className="w-2.5 h-2.5 text-red-950 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); minimizeApp(id); }}
                className="w-3.5 h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center group transition-colors"
              >
                <Minus className="w-2.5 h-2.5 text-yellow-950 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); maximizeApp(id); }}
                className="w-3.5 h-3.5 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center group transition-colors"
              >
                <Maximize2 className="w-2.5 h-2.5 text-green-950 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          )}

          {/* Header arrastável (apenas no modo janela) */}
          <AnimatePresence>
            {!isMaximized && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center justify-between px-4 py-3 bg-zinc-950/80 border-b border-zinc-800 cursor-move select-none" 
                onDoubleClick={() => maximizeApp(id)}
              >
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); closeApp(id); }}
                    className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center group transition-colors"
                  >
                    <X className="w-2.5 h-2.5 text-red-950 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); minimizeApp(id); }}
                    className="w-3.5 h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center group transition-colors"
                  >
                    <Minus className="w-2.5 h-2.5 text-yellow-950 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); maximizeApp(id); }}
                    className="w-3.5 h-3.5 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center group transition-colors"
                  >
                    <Maximize2 className="w-2.5 h-2.5 text-green-950 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>

                <div className="flex-1 text-center font-mono text-xs tracking-widest text-zinc-400 font-medium uppercase">
                  {titleMap[id]}
                </div>

                <div className="w-16" /> {/* Espaçador */}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Body da Janela / Site */}
          <motion.div 
            layout
            className={cn(
              "flex-1 overflow-y-auto font-sans text-zinc-300",
              isMaximized ? "bg-zinc-950 p-12 md:p-24" : "bg-zinc-900/50 p-6 md:p-10"
            )}
          >
            <motion.div 
              initial={false}
              animate={{ y: isMaximized ? 20 : 0, opacity: 1 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className={cn(
                "font-mono text-yellow-200 uppercase tracking-wider",
                isMaximized ? "text-5xl mb-10" : "text-3xl mb-6"
              )}>
                {titleMap[id]}
              </h2>
              <div className="space-y-4">
                <p>Welcome to the {titleMap[id]} section.</p>
                <p className="text-zinc-500">
                  (The real content for this tab will be added here soon...)
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
