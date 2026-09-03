"use client";

import { useEffect, useRef } from "react";
import type {
  Bullet,
  Particle,
  Alien,
  Meteor,
  HeartDrop,
  SpeedDrop,
} from "./types";
import { sounds } from "@/utils/audio";
import { spawnWave } from "./waveSpawner";
import {
  spawnExplosion,
  spawnPopFx,
  spawnMeteorTrail,
  drawShip,
  drawPlayerBullets,
  drawEnemyBullets,
  drawAlien,
  drawMeteor,
  drawHeartDrop,
  drawSpeedDrop,
  drawParticles,
} from "./renderer";
import {
  SHIP_WIDTH,
  SHIP_BASE_SPEED,
  SHIP_BOOST_SPEED,
  INVINCIBILITY_FRAMES,
  HIT_FLASH_DURATION_MS,
  FIRE_COOLDOWN_NORMAL_MS,
  FIRE_COOLDOWN_BOOST_MS,
  BULLET_SPEED,
  SPEED_BOOST_DURATION_FRAMES,
  METEOR_START_WAVE,
  HEART_DROP_START_WAVE,
  HEART_DROP_CHANCE,
  SPEED_DROP_CHANCE,
  METEOR_HEART_DROP_CHANCE,
  METEOR_SPEED_DROP_CHANCE,
  ALIEN_BASE_SPEED,
  EDGE_HIT_COOLDOWN,
  MAX_LIVES,
} from "./constants";

interface UseGameLoopOptions {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  gameOverRef: React.RefObject<boolean>;
  restartCount: number;
  exitArcadeMode: () => void;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setHighScore: React.Dispatch<React.SetStateAction<number>>;
  setWave: React.Dispatch<React.SetStateAction<number>>;
  setLives: React.Dispatch<React.SetStateAction<number>>;
  setHitFlash: React.Dispatch<React.SetStateAction<boolean>>;
  triggerGameOver: () => void;
}

export function useGameLoop({
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
}: UseGameLoopOptions): void {
  const fireBulletRef = useRef<() => void>(() => {});

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

    // ── Ship state ──────────────────────────────────────────────────────────
    let shipX = width / 2;
    let shipY = height - 80;
    let invincibilityTimer = 0;
    let speedBoostTimer = 0;

    // ── Input state (local, managed by event listeners in this effect) ──────
    const keys: Record<string, boolean> = {};
    let isMouseDown = false;
    let lastFireTime = 0;

    const fireBullet = () => {
      const now = Date.now();
      const fireCooldown =
        speedBoostTimer > 0 ? FIRE_COOLDOWN_BOOST_MS : FIRE_COOLDOWN_NORMAL_MS;
      if (now - lastFireTime < fireCooldown) return;
      lastFireTime = now;
      bullets.push({ x: shipX, y: shipY - 12, vy: BULLET_SPEED });
      sounds.playLaser();
    };

    fireBulletRef.current = fireBullet;

    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.code] = true;
      if (e.code === "Space") e.preventDefault();
      if (e.code === "Escape") exitArcadeMode();
      if (e.code === "KeyR" && gameOverRef.current) {
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
      if (e.cancelable && (e.target as HTMLElement).tagName !== "BUTTON")
        e.preventDefault();
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
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });

    // ── Game entities ────────────────────────────────────────────────────────
    let bullets: Bullet[] = [];
    let enemyBullets: Bullet[] = [];
    let particles: Particle[] = [];
    let meteors: Meteor[] = [];
    let heartDrops: HeartDrop[] = [];
    let speedDrops: SpeedDrop[] = [];

    let currentWave = 1;
    let aliens: Alien[] = spawnWave(currentWave, width);
    let alienDirection = 1;
    let alienSpeed = ALIEN_BASE_SPEED;
    let waveTime = 0;
    let waveStartTime = Date.now();
    let edgeHitCooldown = 0;
    let frameCount = 0;

    // ── Main game loop ───────────────────────────────────────────────────────
    const loop = () => {
      if (gameOverRef.current) return;
      frameCount++;
      waveTime += 0.03;
      if (invincibilityTimer > 0) invincibilityTimer--;
      if (speedBoostTimer > 0) speedBoostTimer--;

      ctx.clearRect(0, 0, width, height);

      // Fire
      if (keys["Space"] || isMouseDown) fireBullet();

      // Move ship
      const curSpeed = speedBoostTimer > 0 ? SHIP_BOOST_SPEED : SHIP_BASE_SPEED;
      if (keys["ArrowLeft"] || keys["KeyA"]) shipX -= curSpeed;
      if (keys["ArrowRight"] || keys["KeyD"]) shipX += curSpeed;
      if (keys["ArrowUp"] || keys["KeyW"]) shipY -= curSpeed;
      if (keys["ArrowDown"] || keys["KeyS"]) shipY += curSpeed;
      shipX = Math.max(SHIP_WIDTH / 2, Math.min(width - SHIP_WIDTH / 2, shipX));
      shipY = Math.max(100, Math.min(height - 40, shipY));

      // Draw ship
      drawShip(
        ctx,
        shipX,
        shipY,
        invincibilityTimer,
        frameCount,
        speedBoostTimer,
      );

      // ── Player bullets ────────────────────────────────────────────────────
      for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].y += bullets[i].vy;
        if (bullets[i].y < 0) bullets.splice(i, 1);
      }
      drawPlayerBullets(ctx, bullets);

      // ── Enemy fire ────────────────────────────────────────────────────────
      const elapsed = Date.now() - waveStartTime;
      const enemyShootInterval = Math.max(25, 140 - (currentWave - 1) * 18);
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
            vy: 3.5 + (currentWave - 1) * 0.5,
          });
        }
      }

      for (let i = enemyBullets.length - 1; i >= 0; i--) {
        const eb = enemyBullets[i];
        eb.y += eb.vy;

        if (
          invincibilityTimer === 0 &&
          Math.abs(eb.x - shipX) < 22 &&
          eb.y >= shipY - 14 &&
          eb.y <= shipY + 14
        ) {
          enemyBullets.splice(i, 1);
          spawnExplosion(particles, shipX, shipY, "#EF4444");
          invincibilityTimer = INVINCIBILITY_FRAMES;
          setHitFlash(true);
          setTimeout(() => setHitFlash(false), HIT_FLASH_DURATION_MS);
          setLives((l) => {
            const next = l - 1;
            if (next <= 0) triggerGameOver();
            return next;
          });
          continue;
        }

        if (eb.y > height) enemyBullets.splice(i, 1);
      }
      drawEnemyBullets(ctx, enemyBullets);

      // ── Galaga diving (Wave 2+) ───────────────────────────────────────────
      if (currentWave >= 2) {
        const diveInterval = Math.max(40, 160 - (currentWave - 2) * 20);
        if (frameCount % diveInterval === 0 && activeAliens.length > 0) {
          const formationAliens = activeAliens.filter(
            (a) => !a.state || a.state === "formation",
          );
          if (formationAliens.length > 0) {
            const maxFlock = Math.min(
              4,
              Math.floor(1 + (currentWave - 2) * 0.5),
            );
            const countToDive = Math.min(
              formationAliens.length,
              Math.max(1, Math.floor(Math.random() * maxFlock) + 1),
            );
            for (let d = 0; d < countToDive; d++) {
              const idx = Math.floor(Math.random() * formationAliens.length);
              const diver = formationAliens[idx];
              diver.state = "diving";
              diver.angle = Math.PI / 2;
              diver.diveSpeed =
                3.2 + (currentWave - 2) * 0.5 + Math.random() * 0.6;
              diver.diveSwoopDir =
                (Math.random() - 0.5) * (0.03 + (currentWave - 2) * 0.008);
              formationAliens.splice(idx, 1);
            }
          }
        }
      }

      // ── Alien update + render ─────────────────────────────────────────────
      let edgeHit = false;
      let aliveCount = 0;

      for (let i = 0; i < aliens.length; i++) {
        const a = aliens[i];
        if (!a.alive) continue;

        if (elapsed < a.appearDelay) {
          aliveCount++;
          continue;
        }

        if (!a.hasPopped) {
          a.hasPopped = true;
          spawnPopFx(particles, a.x + a.width / 2, a.y + a.height / 2, a.color);
        }

        aliveCount++;

        if (!a.state || a.state === "formation") {
          const isMobile = width < 640;
          const currentAlienSpeed = isMobile
            ? 0.9 + (currentWave - 1) * 0.2
            : alienSpeed + (currentWave - 1) * 0.35;
          a.baseX += alienDirection * currentAlienSpeed;
          a.x = a.baseX;
          a.y = a.baseY + Math.sin(waveTime * 2.0 + a.type * 0.8) * 8;

          if (
            edgeHitCooldown === 0 &&
            ((alienDirection < 0 && a.x < 25) ||
              (alienDirection > 0 && a.x + a.width > width - 25))
          ) {
            edgeHit = true;
          }
        } else if (a.state === "diving") {
          const targetAngle = Math.atan2(
            shipY - (a.y + a.height / 2),
            shipX - (a.x + a.width / 2),
          );
          let diff = targetAngle - (a.angle ?? Math.PI / 2);
          while (diff < -Math.PI) diff += Math.PI * 2;
          while (diff > Math.PI) diff -= Math.PI * 2;
          a.angle =
            (a.angle ?? Math.PI / 2) +
            diff * (0.035 + currentWave * 0.005) +
            (a.diveSwoopDir ?? 0);

          a.x += Math.cos(a.angle) * (a.diveSpeed ?? 3.8);
          a.y += Math.sin(a.angle) * (a.diveSpeed ?? 3.8);

          // Collision with player
          if (
            invincibilityTimer === 0 &&
            Math.abs(a.x + a.width / 2 - shipX) < 26 &&
            Math.abs(a.y + a.height / 2 - shipY) < 26
          ) {
            a.alive = false;
            spawnExplosion(
              particles,
              a.x + a.width / 2,
              a.y + a.height / 2,
              a.color,
            );
            spawnExplosion(particles, shipX, shipY, "#EF4444");
            invincibilityTimer = INVINCIBILITY_FRAMES;
            setHitFlash(true);
            setTimeout(() => setHitFlash(false), HIT_FLASH_DURATION_MS);
            setLives((l) => {
              const next = l - 1;
              if (next <= 0) triggerGameOver();
              return next;
            });
          }

          if (a.y > height + 40) {
            a.y = -40;
            a.state = "returning";
          }
        } else if (a.state === "returning") {
          const targetX = a.baseX;
          const targetY = a.baseY + Math.sin(waveTime * 2.0 + a.type * 0.8) * 8;
          const dx = targetX - a.x;
          const dy = targetY - a.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 10) {
            a.x = targetX;
            a.y = targetY;
            a.state = "formation";
          } else {
            a.x += (dx / dist) * (5 + currentWave * 0.5);
            a.y += (dy / dist) * (5 + currentWave * 0.5);
          }
        }

        drawAlien(ctx, a, frameCount);

        // Bullet vs alien collision
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
            spawnExplosion(
              particles,
              a.x + a.width / 2,
              a.y + a.height / 2,
              a.color,
            );

            if (
              currentWave >= HEART_DROP_START_WAVE &&
              Math.random() < HEART_DROP_CHANCE
            ) {
              heartDrops.push({
                x: a.x + a.width / 2,
                y: a.y + a.height / 2,
                vy: 1.5,
                pulse: 0,
              });
            }
            if (Math.random() < SPEED_DROP_CHANCE) {
              speedDrops.push({
                x: a.x + a.width / 2,
                y: a.y + a.height / 2,
                vy: 1.6,
                pulse: 0,
              });
            }

            setScore((s) => {
              const newScore = s + a.points;
              setHighScore((h) => {
                if (newScore > h) {
                  try {
                    localStorage.setItem("arcade_highscore", String(newScore));
                  } catch {
                    /* ignore */
                  }
                  return newScore;
                }
                return h;
              });
              return newScore;
            });
            break;
          }
        }
      }

      // Next wave
      if (aliveCount === 0 && aliens.length > 0) {
        currentWave++;
        setWave(currentWave);
        aliens = spawnWave(currentWave, width);
        waveStartTime = Date.now();
        bullets = [];
        enemyBullets = [];
        heartDrops = [];
        speedDrops = [];
      }

      // Edge bounce
      if (edgeHitCooldown > 0) edgeHitCooldown--;
      if (edgeHit && edgeHitCooldown === 0) {
        edgeHitCooldown = EDGE_HIT_COOLDOWN;
        alienDirection *= -1;
        const isMobile = width < 640;
        const baseDrop = isMobile ? 6 : 10;
        const waveExtra = isMobile
          ? Math.min(4, (currentWave - 1) * 0.6)
          : Math.min(8, (currentWave - 1) * 1.2);
        const dropAmount = Math.round(baseDrop + waveExtra);
        for (const alien of aliens) {
          alien.baseY += dropAmount;
          alien.y += dropAmount;
        }
      }

      // ── Meteors (Wave 5+) ─────────────────────────────────────────────────
      if (currentWave >= METEOR_START_WAVE) {
        const meteorSpawnInterval = Math.max(70, 220 - (currentWave - 5) * 25);
        if (frameCount % meteorSpawnInterval === 0) {
          const meteorHp = currentWave - 4;
          meteors.push({
            x: Math.random() * (width - 80) + 40,
            y: -30,
            vx: (Math.random() - 0.5) * (1.2 + (currentWave - 5) * 0.2),
            vy: 2.0 + Math.random() * 1.2 + (currentWave - 5) * 0.4,
            size: 16 + Math.random() * 14,
            hp: meteorHp,
            maxHp: meteorHp,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.05,
          });
        }
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx;
        m.y += m.vy;
        m.rotation += m.rotSpeed;

        if (m.y > height + 40) {
          meteors.splice(i, 1);
          continue;
        }

        // Bullet hit meteor
        for (let j = bullets.length - 1; j >= 0; j--) {
          const b = bullets[j];
          if (Math.hypot(b.x - m.x, b.y - m.y) < m.size + 4) {
            bullets.splice(j, 1);
            m.hp -= 1;
            spawnPopFx(particles, b.x, b.y, "#A8A29E");

            if (m.hp <= 0) {
              spawnExplosion(particles, m.x, m.y, "#78716C");
              setScore((s) => s + m.maxHp * 25);
              if (Math.random() < METEOR_HEART_DROP_CHANCE)
                heartDrops.push({ x: m.x, y: m.y, vy: 1.6, pulse: 0 });
              if (Math.random() < METEOR_SPEED_DROP_CHANCE)
                speedDrops.push({ x: m.x, y: m.y, vy: 1.6, pulse: 0 });
              meteors.splice(i, 1);
              break;
            }
          }
        }

        if (m.hp <= 0) continue;

        // Player hit meteor
        if (
          invincibilityTimer === 0 &&
          Math.hypot(shipX - m.x, shipY - m.y) < m.size + 18
        ) {
          spawnExplosion(particles, m.x, m.y, "#78716C");
          spawnExplosion(particles, shipX, shipY, "#EF4444");
          meteors.splice(i, 1);
          invincibilityTimer = INVINCIBILITY_FRAMES;
          setHitFlash(true);
          setTimeout(() => setHitFlash(false), HIT_FLASH_DURATION_MS);
          setLives((l) => {
            const next = l - 1;
            if (next <= 0) triggerGameOver();
            return next;
          });
          continue;
        }

        spawnMeteorTrail(particles, m);
        drawMeteor(ctx, m, frameCount);
      }

      // ── Heart drops ───────────────────────────────────────────────────────
      for (let i = heartDrops.length - 1; i >= 0; i--) {
        const h = heartDrops[i];
        h.y += h.vy;
        h.pulse += 0.08;

        if (h.y > height + 30) {
          heartDrops.splice(i, 1);
          continue;
        }

        if (Math.hypot(shipX - h.x, shipY - h.y) < 30) {
          heartDrops.splice(i, 1);
          sounds.playHeart();
          spawnPopFx(particles, shipX, shipY, "#EF4444");
          setLives((l) => Math.min(MAX_LIVES, l + 1));
          continue;
        }

        drawHeartDrop(ctx, h);
      }

      // ── Speed drops ───────────────────────────────────────────────────────
      for (let i = speedDrops.length - 1; i >= 0; i--) {
        const s = speedDrops[i];
        s.y += s.vy;
        s.pulse += 0.09;

        if (s.y > height + 30) {
          speedDrops.splice(i, 1);
          continue;
        }

        if (Math.hypot(shipX - s.x, shipY - s.y) < 30) {
          speedDrops.splice(i, 1);
          sounds.playWarp();
          spawnPopFx(particles, shipX, shipY, "#FACC15");
          speedBoostTimer = SPEED_BOOST_DURATION_FRAMES;
          continue;
        }

        drawSpeedDrop(ctx, s);
      }

      // ── Particles ─────────────────────────────────────────────────────────
      drawParticles(ctx, particles);

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
  }, [restartCount]);
}
