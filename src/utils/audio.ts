"use client";

type ZzfxFn = (...params: (number | undefined)[]) => void;

let zzfxReady: ZzfxFn | null = null;
let loadPromise: Promise<void> | null = null;

function ensureZzfx(): ZzfxFn | null {
  if (typeof window === "undefined") return null;

  if (zzfxReady) return zzfxReady;

  if (!loadPromise) {
    loadPromise = import("zzfx").then((mod) => {
      zzfxReady = mod.zzfx as unknown as ZzfxFn;
    });
  }

  return null;
}

function play(...params: (number | undefined)[]) {
  const fn = ensureZzfx();
  if (fn) {
    try {
      fn(...params);
    } catch {
      // Silently fail if audio context is blocked
    }
  }
}

// ─── Sound presets crafted via ZzFX Sound Designer ───────────────

class SoundEffects {
  playLaser() {
    // Short, punchy laser blip — high pitch descending quickly
    play(
      ...[, , 880, , .02, .04, 1, 1.5, -30, , , , , , , , , .6, .02]
    );
  }

  playExplosion() {
    // Crunchy noise burst with low-freq rumble
    play(
      ...[, , 90, .03, .15, .3, 4, 1.1, , , , , , 1.6, , .3, .1, .5, .08]
    );
  }

  playWarp() {
    // Rising sweep — sci-fi warp effect
    play(
      ...[, , 150, .05, .5, .7, , .8, 3, , 200, .15, .15, , , , , .8, .5]
    );
  }

  playGameOver() {
    // Sad descending tones — game over jingle
    play(
      ...[, , 300, .03, .12, .3, 2, 2, , , -50, .05, .1, , , , , .5, .1]
    );
    setTimeout(() => {
      play(
        ...[, , 200, .03, .1, .4, 2, 2, , , -80, .05, .15, , , , , .4, .12]
      );
    }, 200);
  }
}

export const sounds = new SoundEffects();
