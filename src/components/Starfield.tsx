"use client";

import { useEffect, useRef } from "react";
import { useOSStore } from "@/store/useOSStore";

export function Starfield() {
  const isDark = useOSStore((s) => s.isDark);
  const isWarping = useOSStore((s) => s.isWarping);
  const isWarpingRef = useRef(isWarping);

  useEffect(() => {
    isWarpingRef.current = isWarping;
  }, [isWarping]);

  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    el.appendChild(canvas);

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let w = 0;
    let h = 0;
    let rafId = 0;
    let visible = true;

    let N = 0;
    let sx = new Float32Array(0);
    let sy = new Float32Array(0);
    let sz = new Float32Array(0);

    const spawn = (i: number, deep: boolean) => {
      sx[i] = Math.random() * 2 - 1;
      sy[i] = Math.random() * 2 - 1;
      sz[i] = deep ? 0.2 + Math.random() * 0.8 : 1;
    };

    const alloc = () => {
      N = Math.round(Math.min(750, Math.max(320, (w * h) / 620)));
      sx = new Float32Array(N);
      sy = new Float32Array(N);
      sz = new Float32Array(N);
      for (let i = 0; i < N; i++) spawn(i, true);
    };

    let cx = 0;
    let cy = 0;
    let tx = 0;
    let ty = 0;

    const BASE_SPEED = 0.005;
    const WARP_SPEED = 0.065;

    const getColors = () => {
      if (isDark) {
        return {
          bg: "9, 9, 11",
          brand: "50, 199, 199",
          bright: "200, 255, 245",
          dimAlpha: 0.35,
          brightAlpha: 0.8,
        };
      }
      return {
        bg: "234, 244, 247",
        brand: "20, 24, 33",
        bright: "0, 0, 0",
        dimAlpha: 0.5,
        brightAlpha: 0.9,
      };
    };

    let currentSpeed = BASE_SPEED;

    const frame = () => {
      const colors = getColors();
      const targetSpeed = isWarpingRef.current ? WARP_SPEED : BASE_SPEED;
      currentSpeed += (targetSpeed - currentSpeed) * 0.07;

      const fade = currentSpeed > 0.02 ? 0.15 : 0.34;

      cx += (tx - cx) * 0.012;
      cy += (ty - cy) * 0.012;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = `rgba(${colors.bg}, ${fade})`;
      ctx.fillRect(0, 0, w, h);

      const f = Math.min(w, h) * 0.52;
      const dim = new Path2D();
      const bright = new Path2D();
      let drewBright = false;

      for (let i = 0; i < N; i++) {
        const z0 = sz[i];
        const z1 = z0 - currentSpeed * (0.35 + (1 - z0));
        if (z1 < 0.06) {
          spawn(i, false);
          continue;
        }
        sz[i] = z1;

        const x0 = cx + (sx[i] / z0) * f;
        const y0 = cy + (sy[i] / z0) * f;
        const x1 = cx + (sx[i] / z1) * f;
        const y1 = cy + (sy[i] / z1) * f;

        if ((x0 < -40 || x0 > w + 40 || y0 < -40 || y0 > h + 40) && z0 > 0.5) {
          continue;
        }

        if (z1 < 0.35) {
          bright.moveTo(x0, y0);
          bright.lineTo(x1, y1);
          drewBright = true;
        } else {
          dim.moveTo(x0, y0);
          dim.lineTo(x1, y1);
        }
      }

      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${colors.brand}, ${colors.dimAlpha})`;
      ctx.stroke(dim);

      if (drewBright) {
        ctx.lineWidth = 1.3;
        ctx.strokeStyle = `rgba(${colors.bright}, ${colors.brightAlpha})`;
        ctx.stroke(bright);
      }
    };

    const resize = () => {
      const r = el.getBoundingClientRect();
      w = Math.max(1, Math.floor(r.width || window.innerWidth));
      h = Math.max(1, Math.floor(r.height || window.innerHeight));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const colors = getColors();
      ctx.fillStyle = `rgb(${colors.bg})`;
      ctx.fillRect(0, 0, w, h);
      cx = tx = w / 2;
      cy = ty = h / 2;
      alloc();
    };

    resize();

    const tick = () => {
      if (visible) frame();
      rafId = requestAnimationFrame(tick);
    };

    if (reduced) {
      for (let k = 0; k < 12; k++) frame();
    } else {
      rafId = requestAnimationFrame(tick);
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const mouseX = e.clientX - r.left;
      const mouseY = e.clientY - r.top;
      const midX = w / 2;
      const midY = h / 2;
      tx = midX + (mouseX - midX) * 0.45;
      ty = midY + (mouseY - midY) * 0.45;
    };

    const onLeave = () => {
      tx = w / 2;
      ty = h / 2;
    };

    if (!reduced) {
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerleave", onLeave);
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) for (let k = 0; k < 12; k++) frame();
    });
    ro.observe(el);

    const vio = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;
      },
      { threshold: 0 },
    );
    vio.observe(el);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      vio.disconnect();
      if (!reduced) {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerleave", onLeave);
      }
      canvas.remove();
    };
  }, [isDark]);

  return (
    <div
      ref={hostRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
