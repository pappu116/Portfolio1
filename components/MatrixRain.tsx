"use client";

import { useEffect, useRef } from "react";

// Toggleable "digital rain" easter egg canvas overlay.
export default function MatrixRain({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.style.display = "block";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ01";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array<number>(columns).fill(1);
    let raf = 0;

    const draw = () => {
      if (!canvasRef.current) return;
      ctx.fillStyle = "rgba(5, 8, 17, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00f0ff";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      canvas.style.display = "none";
    };
  }, [active]);

  return <canvas ref={canvasRef} className="matrix-canvas" aria-hidden />;
}
