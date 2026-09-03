"use client";

import { useEffect, useRef, useState } from "react";
import { useOSStore } from "@/store/useOSStore";
import { sounds } from "@/utils/audio";
import { useGameLoop } from "./useGameLoop";
import { GameHUD } from "./GameHUD";

export function SpaceGame() {
  const { exitArcadeMode, isDark } = useOSStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [wave, setWave] = useState(1);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [hitFlash, setHitFlash] = useState(false);
  const [restartCount, setRestartCount] = useState(0);

  const gameOverRef = useRef(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("arcade_highscore");
      if (saved) setHighScore(parseInt(saved, 10) || 0);
    } catch {
      // storage unavailable
    }
  }, []);

  const triggerGameOver = () => {
    gameOverRef.current = true;
    setGameOver(true);
    sounds.playGameOver();
  };

  const restartGame = () => {
    gameOverRef.current = false;
    setScore(0);
    setWave(1);
    setLives(3);
    setGameOver(false);
    setRestartCount((c) => c + 1);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "KeyR" && gameOverRef.current) restartGame();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useGameLoop({
    canvasRef,
    gameOverRef,
    restartCount,
    exitArcadeMode,
    setScore,
    setHighScore,
    setWave,
    setLives,
    setHitFlash,
    triggerGameOver,
  });

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-40 block w-full h-full cursor-crosshair touch-none"
      />
      <GameHUD
        score={score}
        highScore={highScore}
        wave={wave}
        lives={lives}
        gameOver={gameOver}
        hitFlash={hitFlash}
        onExit={exitArcadeMode}
        onRestart={restartGame}
      />
    </>
  );
}
