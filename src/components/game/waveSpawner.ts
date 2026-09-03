import type { Alien } from "./types";
import { ALIEN_COLORS } from "./constants";

export function spawnWave(wNum: number, width: number): Alien[] {
  const aliens: Alien[] = [];
  let idx = 0;
  const isMobile = width < 640;
  const spacingX = isMobile ? Math.min(38, (width - 48) / 6) : 48;
  const maxCols = isMobile ? 5 : 8;
  const cols = Math.max(
    4,
    Math.min(maxCols, Math.floor((width - 96) / spacingX)),
  );
  const alienW = isMobile ? 24 : 32;
  const alienH = isMobile ? 18 : 22;
  const rowGap = isMobile ? 28 : 38;
  const startY = isMobile ? 65 : 85;
  const startX = (width - cols * spacingX) / 2;

  if (wNum % 3 === 1) {
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < cols; c++) {
        const type = r;
        const color =
          type === 0
            ? ALIEN_COLORS.cyan
            : type === 1
              ? ALIEN_COLORS.amber
              : ALIEN_COLORS.pink;
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
    // V-shape / diamond formation
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
          color: c % 2 === 0 ? ALIEN_COLORS.cyan : ALIEN_COLORS.amber,
          points: 150,
          alive: true,
          appearDelay: idx * 60,
          hasPopped: false,
        });
        idx++;
      }
    }
  } else {
    // Checkerboard 4-row formation
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
          color: isAlt ? ALIEN_COLORS.pink : ALIEN_COLORS.cyan,
          points: 200,
          alive: true,
          appearDelay: idx * 60,
          hasPopped: false,
        });
        idx++;
      }
    }
  }

  return aliens;
}
