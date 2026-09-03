"use client";

import { X, RotateCcw, Trophy, Gamepad2, Heart } from "lucide-react";

interface GameHUDProps {
  score: number;
  highScore: number;
  wave: number;
  lives: number;
  gameOver: boolean;
  hitFlash: boolean;
  onExit: () => void;
  onRestart: () => void;
}

export function GameHUD({
  score,
  highScore,
  wave,
  lives,
  gameOver,
  hitFlash,
  onExit,
  onRestart,
}: GameHUDProps) {
  return (
    <div
      className={`fixed inset-0 z-40 overflow-hidden bg-transparent font-mono select-none touch-none overscroll-none transition-colors duration-200 ${hitFlash ? "bg-red-500/20" : ""}`}
    >
      <div className="absolute top-2.5 sm:top-4 left-2.5 sm:left-4 right-2.5 sm:right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center space-x-1.5 sm:space-x-4">
          <div className="bg-white/80 dark:bg-zinc-900/85 border border-stone-200/80 dark:border-zinc-800 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl backdrop-blur-md shadow-sm">
            <span className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mr-1 sm:mr-2">
              Score
            </span>
            <span className="text-xs sm:text-base font-bold text-brand">
              {score}
            </span>
          </div>

          <div className="bg-white/80 dark:bg-zinc-900/85 border border-stone-200/80 dark:border-zinc-800 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl backdrop-blur-md shadow-sm flex items-center space-x-1 sm:space-x-2">
            <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 dark:text-amber-400" />
            <span className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-widest hidden sm:inline">
              High
            </span>
            <span className="text-xs sm:text-base font-bold text-amber-500 dark:text-amber-400">
              {highScore}
            </span>
          </div>

          <div className="bg-white/80 dark:bg-zinc-900/85 border border-stone-200/80 dark:border-zinc-800 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl backdrop-blur-md shadow-sm">
            <span className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mr-1 sm:mr-2">
              Wave
            </span>
            <span className="text-xs sm:text-base font-bold text-emerald-500 dark:text-emerald-400">
              {wave}
            </span>
          </div>

          <div className="bg-white/80 dark:bg-zinc-900/85 border border-stone-200/80 dark:border-zinc-800 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl backdrop-blur-md shadow-sm flex items-center space-x-1">
            {[...Array(3)].map((_, i) => (
              <Heart
                key={i}
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                  i < lives
                    ? "text-red-500 fill-red-500"
                    : "text-zinc-300 dark:text-zinc-700"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2 pointer-events-auto">
          <button
            onClick={onExit}
            className="flex items-center space-x-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-red-500/10 dark:bg-red-500/20 border border-red-500/30 dark:border-red-500/40 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors text-[11px] sm:text-xs font-mono font-bold cursor-pointer whitespace-nowrap shrink-0"
          >
            <span className="hidden sm:inline">Exit Arcade</span>
            <span className="inline sm:hidden">Exit</span>
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none z-10">
        <p className="text-[11px] text-zinc-600 dark:text-zinc-400 font-mono bg-white/80 dark:bg-zinc-900/85 inline-block px-3 py-1 rounded-full border border-stone-200/80 dark:border-zinc-800 backdrop-blur-md shadow-sm">
          Hold / Click Space to Shoot • Move WASD / Arrows / Mouse / Touch
        </p>
      </div>

      {gameOver && (
        <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md flex flex-col items-center justify-center p-6 z-20">
          <div className="max-w-md w-full p-8 rounded-3xl bg-zinc-900 border border-zinc-800 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 mx-auto flex items-center justify-center">
              <Gamepad2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white tracking-widest uppercase">
                Game Over
              </h2>
              <p className="text-xs text-zinc-400">
                Final Score: <strong className="text-brand">{score}</strong>
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={onRestart}
                className="flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-brand text-zinc-950 font-bold hover:bg-brand/90 transition-colors text-sm cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Again (R)</span>
              </button>

              <button
                onClick={onExit}
                className="flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors text-sm cursor-pointer"
              >
                <span>Exit</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
