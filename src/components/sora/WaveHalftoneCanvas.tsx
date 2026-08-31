"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

export function WaveHalftoneCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;
    let time = 0;

    let mouseX = 0.5;
    let mouseY = 0.5;
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left) / width;
      targetMouseY = (e.clientY - rect.top) / height;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    handleResize();

    const render = () => {
      if (prefersReduced) {
        // Draw static beautiful impressionist background with halftone
        drawFrame(ctx, width, height, 0, 0.5, 0.5);
        return;
      }

      time += 0.006;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      drawFrame(ctx, width, height, time, mouseX, mouseY);
      animationId = requestAnimationFrame(render);
    };

    const drawFrame = (
      context: CanvasRenderingContext2D,
      w: number,
      h: number,
      t: number,
      mx: number,
      my: number
    ) => {
      // 1. Fill base dark charcoal
      context.fillStyle = "#121212";
      context.fillRect(0, 0, w, h);

      // 2. Draw vibrant organic color clouds (Green, Gold, Pink, Blue)
      const grad1 = context.createRadialGradient(
        w * (0.3 + Math.sin(t * 0.8) * 0.15 + (mx - 0.5) * 0.2),
        h * (0.4 + Math.cos(t * 0.7) * 0.15 + (my - 0.5) * 0.2),
        20,
        w * 0.3,
        h * 0.4,
        w * 0.65
      );
      grad1.addColorStop(0, "rgba(45, 106, 50, 0.85)"); // Vibrant Forest Green
      grad1.addColorStop(0.5, "rgba(22, 70, 30, 0.4)");
      grad1.addColorStop(1, "rgba(18, 18, 18, 0)");
      context.fillStyle = grad1;
      context.fillRect(0, 0, w, h);

      const grad2 = context.createRadialGradient(
        w * (0.75 + Math.cos(t * 0.6) * 0.15 - (mx - 0.5) * 0.2),
        h * (0.35 + Math.sin(t * 0.9) * 0.15 - (my - 0.5) * 0.2),
        20,
        w * 0.75,
        h * 0.35,
        w * 0.6
      );
      grad2.addColorStop(0, "rgba(217, 140, 25, 0.85)"); // Vibrant Marigold / Gold
      grad2.addColorStop(0.6, "rgba(180, 100, 15, 0.35)");
      grad2.addColorStop(1, "rgba(18, 18, 18, 0)");
      context.fillStyle = grad2;
      context.fillRect(0, 0, w, h);

      const grad3 = context.createRadialGradient(
        w * (0.2 + Math.cos(t * 0.5) * 0.1),
        h * (0.7 + Math.sin(t * 0.6) * 0.1),
        10,
        w * 0.2,
        h * 0.7,
        w * 0.55
      );
      grad3.addColorStop(0, "rgba(215, 75, 120, 0.65)"); // Soft Pastel Pink / Rose
      grad3.addColorStop(0.5, "rgba(160, 45, 85, 0.3)");
      grad3.addColorStop(1, "rgba(18, 18, 18, 0)");
      context.fillStyle = grad3;
      context.fillRect(0, 0, w, h);

      const grad4 = context.createRadialGradient(
        w * (0.8 + Math.sin(t * 0.7) * 0.1),
        h * (0.8 + Math.cos(t * 0.5) * 0.1),
        10,
        w * 0.8,
        h * 0.8,
        w * 0.6
      );
      grad4.addColorStop(0, "rgba(30, 90, 160, 0.65)"); // Cerulean Blue
      grad4.addColorStop(0.6, "rgba(15, 50, 100, 0.3)");
      grad4.addColorStop(1, "rgba(18, 18, 18, 0)");
      context.fillStyle = grad4;
      context.fillRect(0, 0, w, h);

      // 3. Crisp Halftone Dot Grid Overlay matching SoraLabs
      const dotSpacing = 7;
      const radius = 1.6;
      context.fillStyle = "rgba(0, 0, 0, 0.62)";

      for (let x = 0; x < w; x += dotSpacing) {
        for (let y = 0; y < h; y += dotSpacing) {
          context.beginPath();
          context.arc(x, y, radius, 0, Math.PI * 2);
          context.fill();
        }
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [prefersReduced]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Subtle top/bottom edge vignetting */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#121212]" />
    </div>
  );
}
