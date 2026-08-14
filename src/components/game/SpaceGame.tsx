"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, RotateCcw, Trophy, Gamepad2, Heart } from "lucide-react";
import { useOSStore } from "@/store/useOSStore";
import { sounds } from "@/utils/audio";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface Bullet {
  x: number;
  y: number;
  vy: number;
  isEnemy?: boolean;
}

interface Alien {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  width: number;
  height: number;
  type: number;
  color: string;
  points: number;
  alive: boolean;
  appearDelay: number;
  hasPopped?: boolean;
  state?: "formation" | "diving" | "returning";
  angle?: number;
  diveSpeed?: number;
  diveSwoopDir?: number;
}

export function SpaceGame() {
  const { exitArcadeMode, isDark } = useOSStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [wave, setWave] = useState(1);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const gameOverRef = useRef(false);
  const [hitFlash, setHitFlash] = useState(false);
  const [restartCount, setRestartCount] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("arcade_highscore");
    if (saved) {
      setHighScore(parseInt(saved, 10) || 0);
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
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const origOverflow = document.body.style.overflow;
    const origTouchAction = document.body.style.touchAction;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    let animId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    let shipX = width / 2;
    let shipY = height - 80;
    const shipWidth = 40;
    let shipSpeed = 8;
    let invincibilityTimer = 0;

    const keys: Record<string, boolean> = {};
    let isMouseDown = false;
    let lastFireTime = 0;

    const fireBullet = () => {
      const now = Date.now();
      if (now - lastFireTime < 550) return;
      lastFireTime = now;

      bullets.push({
        x: shipX,
        y: shipY - 12,
        vy: -14,
      });
      sounds.playLaser();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.code] = true;
      if (e.code === "Space") {
        e.preventDefault();
      }
      if (e.code === "Escape") {
        exitArcadeMode();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.code] = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      shipX = e.clientX;
      shipY = e.clientY;
    };

    const handleMouseDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName !== "BUTTON") {
        isMouseDown = true;
        fireBullet();
      }
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.cancelable) e.preventDefault();
      if (e.touches[0]) {
        shipX = e.touches[0].clientX;
        shipY = e.touches[0].clientY;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.cancelable && (e.target as HTMLElement).tagName !== "BUTTON") {
        e.preventDefault();
      }
      if ((e.target as HTMLElement).tagName !== "BUTTON") {
        isMouseDown = true;
        fireBullet();
      }
    };

    const handleTouchEnd = () => {
      isMouseDown = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });

    let bullets: Bullet[] = [];
    let enemyBullets: Bullet[] = [];
    let particles: Particle[] = [];

    let currentWave = 1;
    let aliens: Alien[] = [];
    let alienDirection = 1;
    let alienSpeed = 1.5;
    let waveTime = 0;
    let waveStartTime = Date.now();

    const spawnWave = (wNum: number) => {
      aliens = [];
      waveStartTime = Date.now();
      let idx = 0;
      const isMobile = width < 640;
      const spacingX = isMobile ? Math.min(42, (width - 32) / 6) : 52;
      const maxCols = isMobile ? 6 : 10;
      const cols = Math.min(maxCols, Math.floor((width - 32) / spacingX));
      const alienW = isMobile ? 26 : 34;
      const alienH = isMobile ? 18 : 24;
      const rowGap = isMobile ? 30 : 42;
      const startY = isMobile ? 65 : 85;

      const startX = (width - cols * spacingX) / 2;

      if (wNum % 3 === 1) {
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < cols; c++) {
            const type = r;
            const color =
              type === 0 ? "#32C7C7" : type === 1 ? "#F59E0B" : "#EC4899";
            aliens.push({
              x: startX + c * spacingX,
              y: startY + r * rowGap,
              baseX: startX + c * spacingX,
              baseY: startY + r * rowGap,
              width: alienW,
              height: alienH,
              type,
              color,
              points: (3 - r) * 100,
              alive: true,
              appearDelay: idx * 60,
              hasPopped: false,
            });
            idx++;
          }
        }
      } else if (wNum % 3 === 2) {
        const mid = Math.floor(cols / 2);
        for (let c = 0; c < cols; c++) {
          const rowOffset = Math.abs(c - mid);
          for (let r = 0; r < 2; r++) {
            const yPos = startY + (rowOffset + r * 1.5) * (rowGap * 0.85);
            aliens.push({
              x: startX + c * spacingX,
              y: yPos,
              baseX: startX + c * spacingX,
              baseY: yPos,
              width: alienW,
              height: alienH,
              type: c % 3,
              color: c % 2 === 0 ? "#32C7C7" : "#F59E0B",
              points: 150,
              alive: true,
              appearDelay: idx * 60,
              hasPopped: false,
            });
            idx++;
          }
        }
      } else {
        for (let r = 0; r < 4; r++) {
          for (let c = 0; c < cols; c++) {
            const isAlt = (r + c) % 2 === 0;
            aliens.push({
              x: startX + c * spacingX,
              y: startY + r * (rowGap * 0.9),
              baseX: startX + c * spacingX,
              baseY: startY + r * (rowGap * 0.9),
              width: alienW,
              height: alienH,
              type: r % 3,
              color: isAlt ? "#EC4899" : "#32C7C7",
              points: 200,
              alive: true,
              appearDelay: idx * 60,
              hasPopped: false,
            });
            idx++;
          }
        }
      }
    };

    spawnWave(currentWave);

    const spawnExplosion = (x: number, y: number, color: string) => {
      sounds.playExplosion();
      for (let i = 0; i < 22; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 6;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 20 + Math.random() * 16,
          color: Math.random() > 0.3 ? color : "#FFFFFF",
          size: 2.5 + Math.random() * 3.5,
        });
      }
    };

    const spawnPopFx = (x: number, y: number, color: string) => {
      for (let i = 0; i < 6; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 3;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 10 + Math.random() * 10,
          color,
          size: 2,
        });
      }
    };

    let frameCount = 0;

    const loop = () => {
      if (gameOverRef.current) return;
      frameCount++;
      waveTime += 0.03;
      if (invincibilityTimer > 0) invincibilityTimer--;

      ctx.clearRect(0, 0, width, height);

      if (keys["Space"] || isMouseDown) {
        fireBullet();
      }

      if (keys["ArrowLeft"] || keys["KeyA"]) {
        shipX -= shipSpeed;
      }
      if (keys["ArrowRight"] || keys["KeyD"]) {
        shipX += shipSpeed;
      }
      if (keys["ArrowUp"] || keys["KeyW"]) {
        shipY -= shipSpeed;
      }
      if (keys["ArrowDown"] || keys["KeyS"]) {
        shipY += shipSpeed;
      }
      shipX = Math.max(shipWidth / 2, Math.min(width - shipWidth / 2, shipX));
      shipY = Math.max(100, Math.min(height - 40, shipY));

      if (invincibilityTimer === 0 || Math.floor(frameCount / 4) % 2 === 0) {
        ctx.fillStyle = "#32C7C7";
        ctx.beginPath();
        ctx.moveTo(shipX, shipY - 16);
        ctx.lineTo(shipX - 20, shipY + 12);
        ctx.lineTo(shipX - 10, shipY + 8);
        ctx.lineTo(shipX + 10, shipY + 8);
        ctx.lineTo(shipX + 20, shipY + 12);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#A4FFBE";
        ctx.fillRect(shipX - 2, shipY - 20, 4, 8);
      }

      for (let i = bullets.length - 1; i >= 0; i--) {
        const b = bullets[i];
        b.y += b.vy;

        ctx.fillStyle = "#32C7C7";
        ctx.shadowColor = "#32C7C7";
        ctx.shadowBlur = 10;
        ctx.fillRect(b.x - 2, b.y - 8, 4, 14);
        ctx.shadowBlur = 0;

        if (b.y < 0) {
          bullets.splice(i, 1);
        }
      }

      const elapsed = Date.now() - waveStartTime;
      const enemyShootInterval = Math.max(35, 110 - currentWave * 12);
      const activeAliens = aliens.filter(
        (a) => a.alive && elapsed >= a.appearDelay,
      );

      if (frameCount % enemyShootInterval === 0 && activeAliens.length > 0) {
        const randomAlien =
          activeAliens[Math.floor(Math.random() * activeAliens.length)];
        if (randomAlien) {
          enemyBullets.push({
            x: randomAlien.x + randomAlien.width / 2,
            y: randomAlien.y + randomAlien.height,
            vy: 4.5 + currentWave * 0.4,
          });
        }
      }

      for (let i = enemyBullets.length - 1; i >= 0; i--) {
        const eb = enemyBullets[i];
        eb.y += eb.vy;

        ctx.fillStyle = "#EF4444";
        ctx.shadowColor = "#EF4444";
        ctx.shadowBlur = 8;
        ctx.fillRect(eb.x - 2.5, eb.y - 6, 5, 12);
        ctx.shadowBlur = 0;

        if (
          invincibilityTimer === 0 &&
          Math.abs(eb.x - shipX) < 22 &&
          eb.y >= shipY - 14 &&
          eb.y <= shipY + 14
        ) {
          enemyBullets.splice(i, 1);
          spawnExplosion(shipX, shipY, "#EF4444");
          invincibilityTimer = 65;
          setHitFlash(true);
          setTimeout(() => setHitFlash(false), 200);

          setLives((l) => {
            const nextLives = l - 1;
            if (nextLives <= 0) {
              triggerGameOver();
            }
            return nextLives;
          });
          continue;
        }

        if (eb.y > height) {
          enemyBullets.splice(i, 1);
        }
      }

      let edgeHit = false;
      let aliveCount = 0;

      // Periodically trigger Galaga-style swooping diving attacks!
      const diveInterval = Math.max(70, 160 - currentWave * 15);
      if (frameCount % diveInterval === 0 && activeAliens.length > 0) {
        const formationAliens = activeAliens.filter(
          (a) => !a.state || a.state === "formation",
        );
        if (formationAliens.length > 0) {
          const countToDive = Math.min(
            formationAliens.length,
            Math.random() < 0.35 ? 2 : 1,
          );
          for (let d = 0; d < countToDive; d++) {
            const idx = Math.floor(Math.random() * formationAliens.length);
            const diver = formationAliens[idx];
            diver.state = "diving";
            diver.angle = Math.PI / 2;
            diver.diveSpeed = 3.5 + currentWave * 0.4 + Math.random() * 0.8;
            diver.diveSwoopDir = (Math.random() - 0.5) * 0.04;
            formationAliens.splice(idx, 1);
          }
        }
      }

      for (let i = 0; i < aliens.length; i++) {
        const a = aliens[i];
        if (!a.alive) continue;

        if (elapsed < a.appearDelay) {
          aliveCount++;
          continue;
        }

        if (!a.hasPopped) {
          a.hasPopped = true;
          spawnPopFx(a.x + a.width / 2, a.y + a.height / 2, a.color);
        }

        aliveCount++;

        // --- Alien Movement State Machine ---
        if (!a.state || a.state === "formation") {
          a.baseX += alienDirection * (alienSpeed + currentWave * 0.25);
          a.x = a.baseX;
          a.y = a.baseY + Math.sin(waveTime * 1.5 + a.baseX * 0.03) * 12;

          if (a.x < 20 || a.x + a.width > width - 20) {
            edgeHit = true;
          }
        } else if (a.state === "diving") {
          // Swooping curve towards player ship
          const targetAngle = Math.atan2(
            shipY - (a.y + a.height / 2),
            shipX - (a.x + a.width / 2),
          );
          let diff = targetAngle - (a.angle || Math.PI / 2);
          while (diff < -Math.PI) diff += Math.PI * 2;
          while (diff > Math.PI) diff -= Math.PI * 2;
          a.angle =
            (a.angle || Math.PI / 2) + diff * 0.035 + (a.diveSwoopDir || 0);

          a.x += Math.cos(a.angle) * (a.diveSpeed || 3.5);
          a.y += Math.sin(a.angle) * (a.diveSpeed || 3.5);

          // Shoot while diving
          if (Math.random() < 0.025) {
            enemyBullets.push({
              x: a.x + a.width / 2,
              y: a.y + a.height,
              vy: 5 + currentWave * 0.4,
            });
          }

          // Direct collision with player ship
          if (
            invincibilityTimer === 0 &&
            Math.abs(a.x + a.width / 2 - shipX) < 26 &&
            Math.abs(a.y + a.height / 2 - shipY) < 26
          ) {
            a.alive = false;
            spawnExplosion(a.x + a.width / 2, a.y + a.height / 2, a.color);
            spawnExplosion(shipX, shipY, "#EF4444");
            invincibilityTimer = 65;
            setHitFlash(true);
            setTimeout(() => setHitFlash(false), 200);
            setLives((l) => {
              const nextLives = l - 1;
              if (nextLives <= 0) {
                triggerGameOver();
              }
              return nextLives;
            });
          }

          // Reached bottom -> loop around to top and return
          if (a.y > height + 40) {
            a.y = -40;
            a.state = "returning";
          }
        } else if (a.state === "returning") {
          const targetX = a.baseX;
          const targetY =
            a.baseY + Math.sin(waveTime * 1.5 + a.baseX * 0.03) * 12;
          const dx = targetX - a.x;
          const dy = targetY - a.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 10) {
            a.x = targetX;
            a.y = targetY;
            a.state = "formation";
          } else {
            a.x += (dx / dist) * 5;
            a.y += (dy / dist) * 5;
          }
        }

        ctx.fillStyle = a.color;
        const animFrame = Math.floor(frameCount / 20) % 2;
        const scale = a.width / 34;

        ctx.fillRect(a.x + 8 * scale, a.y, 18 * scale, 4 * scale);
        ctx.fillRect(a.x + 4 * scale, a.y + 4 * scale, 26 * scale, 8 * scale);
        ctx.fillRect(a.x, a.y + 12 * scale, a.width, 6 * scale);

        if (animFrame === 0) {
          ctx.fillRect(a.x + 4 * scale, a.y + 18 * scale, 6 * scale, 6 * scale);
          ctx.fillRect(a.x + 24 * scale, a.y + 18 * scale, 6 * scale, 6 * scale);
        } else {
          ctx.fillRect(a.x, a.y + 18 * scale, 6 * scale, 6 * scale);
          ctx.fillRect(a.x + 28 * scale, a.y + 18 * scale, 6 * scale, 6 * scale);
        }

        for (let j = bullets.length - 1; j >= 0; j--) {
          const b = bullets[j];
          if (
            b.x >= a.x &&
            b.x <= a.x + a.width &&
            b.y >= a.y &&
            b.y <= a.y + a.height
          ) {
            a.alive = false;
            bullets.splice(j, 1);
            spawnExplosion(a.x + a.width / 2, a.y + a.height / 2, a.color);

            setScore((s) => {
              const newScore = s + a.points;
              setHighScore((h) => {
                if (newScore > h) {
                  localStorage.setItem("arcade_highscore", String(newScore));
                  return newScore;
                }
                return h;
              });
              return newScore;
            });
            break;
          }
        }

        if (
          (!a.state || a.state === "formation") &&
          a.y + a.height >= shipY - 10
        ) {
          triggerGameOver();
        }
      }

      if (aliveCount === 0 && aliens.length > 0) {
        currentWave++;
        setWave(currentWave);
        spawnWave(currentWave);
      }

      if (edgeHit) {
        alienDirection *= -1;
        for (let i = 0; i < aliens.length; i++) {
          aliens[i].baseY += 14;
          aliens[i].y += 14;
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const alpha = 1 - p.life / p.maxLife;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.fillRect(p.x, p.y, p.size, p.size);
        ctx.globalAlpha = 1;

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      document.body.style.overflow = origOverflow;
      document.body.style.touchAction = origTouchAction;
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [exitArcadeMode, isDark, restartCount]);

  return (
    <div
      className={`fixed inset-0 z-40 overflow-hidden bg-transparent font-mono select-none touch-none overscroll-none transition-colors duration-200 ${hitFlash ? "bg-red-500/20" : ""}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full cursor-crosshair touch-none"
      />

      {/* Top HUD */}
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

          <div className="bg-white/80 dark:bg-zinc-900/85 border border-stone-200/80 dark:border-zinc-800 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl backdrop-blur-md shadow-sm hidden md:block">
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
            onClick={exitArcadeMode}
            className="flex items-center space-x-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-red-500/10 dark:bg-red-500/20 border border-red-500/30 dark:border-red-500/40 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors text-[11px] sm:text-xs font-mono font-bold cursor-pointer whitespace-nowrap shrink-0"
          >
            <span className="hidden sm:inline">Exit Arcade</span>
            <span className="inline sm:hidden">Exit</span>
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Controls Help */}
      <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none z-10">
        <p className="text-[11px] text-zinc-600 dark:text-zinc-400 font-mono bg-white/80 dark:bg-zinc-900/85 inline-block px-3 py-1 rounded-full border border-stone-200/80 dark:border-zinc-800 backdrop-blur-md shadow-sm">
          Hold / Click Space to Shoot • Move WASD / Arrows / Mouse / Touch
        </p>
      </div>

      {/* Game Over Modal */}
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
                onClick={restartGame}
                className="flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-brand text-zinc-950 font-bold hover:bg-brand/90 transition-colors text-sm cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Again</span>
              </button>

              <button
                onClick={exitArcadeMode}
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
