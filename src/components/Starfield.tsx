"use client";

import React, { useEffect, useRef } from "react";
import { useOSStore } from "@/store/useOSStore";

const DARK_BG = "#09090b";
const DARK_STAR = "255,255,255";
const LIGHT_BG = "#EAF4F7";
const LIGHT_STAR = "30,25,60";

export function Starfield() {
  const isDark = useOSStore((s) => s.isDark);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bgColor = isDark ? DARK_BG : LIGHT_BG;
    const starColor = isDark ? DARK_STAR : LIGHT_STAR;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars: { x: number; y: number; z: number }[] = [];
    const numStars = 500;
    const speed = 2;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width * 2 - width,
        y: Math.random() * height * 2 - height,
        z: Math.random() * width,
      });
    }

    let animationFrameId: number;

    const render = () => {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < numStars; i++) {
        const star = stars[i];

        star.z -= speed;

        if (star.z <= 0) {
          star.x = Math.random() * width * 2 - width;
          star.y = Math.random() * height * 2 - height;
          star.z = width;
        }

        const k = 128.0 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        const size = (1 - star.z / width) * 3;
        const opacity = 1 - star.z / width;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(${starColor}, ${opacity})`;
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
}
