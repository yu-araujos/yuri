"use client";

import { useEffect, useRef } from "react";

interface UseGameInputOptions {
  onExit: () => void;
  onRestart: () => void;
  gameOverRef: React.RefObject<boolean>;
  fireBulletRef: React.RefObject<() => void>;
}

export interface InputState {
  keys: React.RefObject<Record<string, boolean>>;
  isMouseDown: React.RefObject<boolean>;
  shipX: React.RefObject<number>;
  shipY: React.RefObject<number>;
}

export function useGameInput(
  { onExit, onRestart, gameOverRef, fireBulletRef }: UseGameInputOptions,
  initialShipX: number,
  initialShipY: number,
): InputState {
  const keys = useRef<Record<string, boolean>>({});
  const isMouseDown = useRef(false);
  const shipX = useRef(initialShipX);
  const shipY = useRef(initialShipY);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.code] = true;
      if (e.code === "Space") e.preventDefault();
      if (e.code === "Escape") onExit();
      if (e.code === "KeyR" && gameOverRef.current) onRestart();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.code] = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      shipX.current = e.clientX;
      shipY.current = e.clientY;
    };

    const handleMouseDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName !== "BUTTON") {
        isMouseDown.current = true;
        fireBulletRef.current?.();
      }
    };

    const handleMouseUp = () => {
      isMouseDown.current = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.cancelable) e.preventDefault();
      if (e.touches[0]) {
        shipX.current = e.touches[0].clientX;
        shipY.current = e.touches[0].clientY;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.cancelable && (e.target as HTMLElement).tagName !== "BUTTON") {
        e.preventDefault();
      }
      if ((e.target as HTMLElement).tagName !== "BUTTON") {
        isMouseDown.current = true;
        fireBulletRef.current?.();
      }
    };

    const handleTouchEnd = () => {
      isMouseDown.current = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onExit, onRestart, gameOverRef, fireBulletRef]);

  return { keys, isMouseDown, shipX, shipY };
}
