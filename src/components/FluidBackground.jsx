import React, { useRef, useEffect } from 'react';

export const FluidBackground = ({ theme }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Simplex-like fluid using layered sin waves
    let t = 0;
    const COLS = 60;
    const ROWS = 40;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = theme === 'dark';

      const cellW = width / COLS;
      const cellH = height / ROWS;

      for (let x = 0; x <= COLS; x++) {
        for (let y = 0; y <= ROWS; y++) {
          const nx = x / COLS;
          const ny = y / ROWS;

          const val =
            Math.sin(nx * 6 + t * 0.3) *
            Math.cos(ny * 5 - t * 0.2) *
            Math.sin((nx + ny) * 4 + t * 0.15);

          const normalised = (val + 1) / 2; // 0..1

          const alpha = normalised * (isDark ? 0.12 : 0.05);

          ctx.fillStyle = isDark
            ? `rgba(255, 255, 255, ${alpha})`
            : `rgba(0, 0, 0, ${alpha})`;

          ctx.fillRect(x * cellW - cellW / 2, y * cellH - cellH / 2, cellW + 1, cellH + 1);
        }
      }

      t += 0.008;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
};
