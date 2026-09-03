import type { Particle, Bullet, Alien, Meteor, HeartDrop, SpeedDrop } from "./types";
import { sounds } from "@/utils/audio";

// ---------------------------------------------------------------------------
// Particle factories
// ---------------------------------------------------------------------------

export function spawnExplosion(
  particles: Particle[],
  x: number,
  y: number,
  color: string,
): void {
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
}

export function spawnPopFx(
  particles: Particle[],
  x: number,
  y: number,
  color: string,
): void {
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
}

// ---------------------------------------------------------------------------
// Ship
// ---------------------------------------------------------------------------

export function drawShip(
  ctx: CanvasRenderingContext2D,
  shipX: number,
  shipY: number,
  invincibilityTimer: number,
  frameCount: number,
  speedBoostTimer: number,
): void {
  // Speed boost trail
  if (speedBoostTimer > 0) {
    ctx.fillStyle = "#FACC15";
    ctx.shadowColor = "#FACC15";
    ctx.shadowBlur = 15;
    ctx.fillRect(shipX - 14, shipY + 10, 28, 4);
    ctx.shadowBlur = 0;
  }

  // Blink when invincible
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
}

// ---------------------------------------------------------------------------
// Bullets
// ---------------------------------------------------------------------------

export function drawPlayerBullets(
  ctx: CanvasRenderingContext2D,
  bullets: Bullet[],
): void {
  ctx.fillStyle = "#32C7C7";
  ctx.shadowColor = "#32C7C7";
  ctx.shadowBlur = 10;
  for (const b of bullets) {
    ctx.fillRect(b.x - 2, b.y - 8, 4, 14);
  }
  ctx.shadowBlur = 0;
}

export function drawEnemyBullets(
  ctx: CanvasRenderingContext2D,
  enemyBullets: Bullet[],
): void {
  ctx.fillStyle = "#E087FF";
  ctx.shadowColor = "#E087FF";
  ctx.shadowBlur = 10;
  for (const eb of enemyBullets) {
    ctx.fillRect(eb.x - 2.5, eb.y - 6, 5, 12);
  }
  ctx.shadowBlur = 0;
}

// ---------------------------------------------------------------------------
// Aliens
// ---------------------------------------------------------------------------

export function drawAlien(
  ctx: CanvasRenderingContext2D,
  a: Alien,
  frameCount: number,
): void {
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
}

// ---------------------------------------------------------------------------
// Meteors
// ---------------------------------------------------------------------------

export function spawnMeteorTrail(particles: Particle[], m: Meteor): void {
  if (Math.random() < 0.7) {
    particles.push({
      x: m.x + (Math.random() - 0.5) * m.size * 0.7,
      y: m.y - m.size * 0.4,
      vx: -m.vx * 0.2 + (Math.random() - 0.5) * 1.5,
      vy: -m.vy * 0.5 - Math.random() * 2.5,
      life: 0,
      maxLife: 10 + Math.random() * 8,
      color: Math.random() < 0.5 ? "#F97316" : "#FACC15",
      size: 2 + Math.random() * 2,
    });
  }
}

export function drawMeteor(
  ctx: CanvasRenderingContext2D,
  m: Meteor,
  frameCount: number,
): void {
  const sz = m.size * 1.2;
  const mx = m.x;
  const my = m.y;

  const fCycle = (frameCount + Math.floor(mx * 10)) * 0.35;
  const flameWave1 = Math.sin(fCycle) * sz * 0.15;
  const flameWave2 = Math.cos(fCycle * 1.4) * sz * 0.12;
  const flameH = sz * 1.1 + Math.sin(fCycle * 2) * sz * 0.2;

  // Red outer flame
  ctx.fillStyle = "#EF4444";
  ctx.fillRect(mx - sz * 0.4 + flameWave1, my - sz * 0.4 - flameH * 0.75, sz * 0.8, flameH * 0.75);
  ctx.fillRect(mx - sz * 0.25 - flameWave2, my - sz * 0.4 - flameH * 1.05, sz * 0.5, flameH * 0.4);
  ctx.fillRect(mx - sz * 0.55 + flameWave2, my - sz * 0.4 - flameH * 0.55, sz * 0.3, flameH * 0.5);
  ctx.fillRect(mx + sz * 0.25 - flameWave1, my - sz * 0.4 - flameH * 0.55, sz * 0.3, flameH * 0.5);

  // Orange mid flame
  ctx.fillStyle = "#F97316";
  ctx.fillRect(mx - sz * 0.3 - flameWave2, my - sz * 0.4 - flameH * 0.7, sz * 0.6, flameH * 0.6);
  ctx.fillRect(mx - sz * 0.15 + flameWave1, my - sz * 0.4 - flameH * 0.9, sz * 0.3, flameH * 0.35);

  // Yellow inner flame core
  ctx.fillStyle = "#FACC15";
  ctx.fillRect(mx - sz * 0.2 + flameWave1 * 0.5, my - sz * 0.4 - flameH * 0.5, sz * 0.4, flameH * 0.4);

  // White hot core
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(mx - sz * 0.1, my - sz * 0.4 - flameH * 0.3, sz * 0.2, flameH * 0.25);

  // Flying embers
  const emberOff1 = (frameCount * 3 + Math.floor(mx)) % 22;
  const emberOff2 = (frameCount * 4 + Math.floor(my)) % 26;
  ctx.fillStyle = "#FACC15";
  ctx.fillRect(mx - sz * 0.25 + flameWave2, my - sz * 0.4 - flameH - emberOff1 * 0.7, sz * 0.15, sz * 0.15);
  ctx.fillStyle = "#F97316";
  ctx.fillRect(mx + sz * 0.1 + flameWave1, my - sz * 0.4 - flameH - emberOff2 * 0.6, sz * 0.18, sz * 0.18);

  // Rock body — dark outer border
  ctx.fillStyle = "#1E293B";
  ctx.beginPath();
  ctx.arc(mx, my, sz * 0.55, 0, Math.PI * 2);
  ctx.fill();

  // Main rock surface
  ctx.fillStyle = "#475569";
  ctx.beginPath();
  ctx.arc(mx, my, sz * 0.48, 0, Math.PI * 2);
  ctx.fill();

  // Top-left highlight
  ctx.fillStyle = "#94A3B8";
  ctx.beginPath();
  ctx.arc(mx - sz * 0.12, my - sz * 0.12, sz * 0.3, 0, Math.PI * 2);
  ctx.fill();

  // Craters
  ctx.fillStyle = "#334155";
  ctx.fillRect(mx - sz * 0.1, my - sz * 0.1, sz * 0.2, sz * 0.2);
  ctx.fillRect(mx + sz * 0.12, my + sz * 0.08, sz * 0.15, sz * 0.15);
  ctx.fillRect(mx - sz * 0.25, my + sz * 0.12, sz * 0.15, sz * 0.15);

  // Damage cracks
  if (m.hp < m.maxHp) {
    ctx.fillStyle = "#F97316";
    ctx.fillRect(mx - sz * 0.2, my - sz * 0.15, sz * 0.35, sz * 0.08);
    ctx.fillRect(mx - sz * 0.05, my - sz * 0.15, sz * 0.08, sz * 0.35);
  }
}

// ---------------------------------------------------------------------------
// Drops
// ---------------------------------------------------------------------------

export function drawHeartDrop(ctx: CanvasRenderingContext2D, h: HeartDrop): void {
  ctx.save();
  ctx.translate(h.x, h.y);
  const pulseScale = (1 + Math.sin(h.pulse) * 0.15) * 0.75;
  ctx.scale(pulseScale, pulseScale);
  ctx.translate(-12, -12);

  ctx.fillStyle = "#EF4444";
  ctx.shadowColor = "#EF4444";
  ctx.shadowBlur = 12;

  const heartPath = new Path2D(
    "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
  );
  ctx.fill(heartPath);
  ctx.restore();
}

export function drawSpeedDrop(ctx: CanvasRenderingContext2D, s: SpeedDrop): void {
  ctx.save();
  ctx.translate(s.x, s.y);
  const pulseScale = (1 + Math.sin(s.pulse) * 0.15) * 0.8;
  ctx.scale(pulseScale, pulseScale);
  ctx.translate(-12, -12);

  ctx.fillStyle = "#FACC15";
  ctx.shadowColor = "#FACC15";
  ctx.shadowBlur = 14;

  const zapPath = new Path2D("M13 2 L3 14 H12 L11 22 L21 10 H12 Z");
  ctx.fill(zapPath);
  ctx.restore();
}

// ---------------------------------------------------------------------------
// Particles
// ---------------------------------------------------------------------------

export function drawParticles(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
): void {
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
}
