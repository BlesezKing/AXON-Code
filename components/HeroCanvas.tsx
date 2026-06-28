'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  motion,
} from 'framer-motion';

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);

  const [loadedCount, setLoadedCount] = useState(0);
  const totalFrames = 200;
  const isLoaded = loadedCount >= totalFrames;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, 199]);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Contain fit, centered
    const scale = Math.min(
      canvas.width / img.naturalWidth,
      canvas.height / img.naturalHeight
    );
    const x = (canvas.width - img.naturalWidth * scale) / 2;
    const y = (canvas.height - img.naturalHeight * scale) / 2;
    ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);

    // Vignette overlay
    const grad = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      Math.max(canvas.width, canvas.height) * 0.7
    );
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(1, 'rgba(8,11,16,0.5)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  // Load all frames on mount
  useEffect(() => {
    const imgs = Array.from({ length: totalFrames }, (_, i) => {
      const img = new Image();
      const frameNum = String(i + 1).padStart(3, '0');
      img.src = `/frames/ezgif-frame-${frameNum}.png`;
      img.onload = () => {
        setLoadedCount((prev) => {
          const next = prev + 1;
          return next;
        });
        // Draw frame 0 as soon as the first image loads
        if (i === 0) {
          drawFrame(0);
        }
      };
      return img;
    });
    imagesRef.current = imgs;
  }, [drawFrame]);

  // Sync canvas size with ResizeObserver
  useEffect(() => {
    const sticky = stickyRef.current;
    const canvas = canvasRef.current;
    if (!sticky || !canvas) return;

    const resizeObserver = new ResizeObserver(() => {
      canvas.width = sticky.offsetWidth;
      canvas.height = sticky.offsetHeight;
      drawFrame(currentFrameRef.current);
    });

    resizeObserver.observe(sticky);

    // Initial size
    canvas.width = sticky.offsetWidth;
    canvas.height = sticky.offsetHeight;

    return () => resizeObserver.disconnect();
  }, [drawFrame]);

  // Animate frames on scroll
  useMotionValueEvent(frameIndex, 'change', (v) => {
    const idx = Math.round(v);
    currentFrameRef.current = idx;
    drawFrame(idx);
  });

  const loadingPercent = Math.round((loadedCount / totalFrames) * 100);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: '900vh' }}
      id="hero-canvas-container"
    >
      {/* Sticky viewport */}
      <div
        ref={stickyRef}
        className="sticky top-0 w-full overflow-hidden bg-[#080B10]"
        style={{ height: '100vh' }}
      >
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          id="hero-canvas"
          aria-label="Animación de ensamblaje del logo Axon Code"
        />

        {/* Title overlay */}
        <motion.div
          style={{ opacity: titleOpacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center px-6 max-w-4xl mx-auto">
            {/* Label */}
            <p
              className="text-[#1E6BFF] uppercase tracking-widest mb-6"
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '12px',
                letterSpacing: '0.25em',
              }}
            >
              INNOVACIÓN TECNOLÓGICA
            </p>

            {/* Main title */}
            <h1
              className="text-5xl md:text-7xl font-bold text-white text-center"
              style={{
                fontFamily: 'Inter, sans-serif',
                textShadow: '0 2px 40px rgba(0,0,0,0.8)',
                lineHeight: '1.1',
              }}
            >
              El futuro se construye pieza a pieza.
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg text-white/70 mt-6"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Inteligencia Artificial · Desarrollo de Software · Soluciones Cloud
            </p>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <p
              className="text-sm text-white/40 animate-bounce"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Scroll para ensamblar el futuro ↓
            </p>
          </div>
        </motion.div>

        {/* Loading bar */}
        {!isLoaded && (
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
            <div
              className="h-full bg-[#1E6BFF] transition-all duration-200"
              style={{ width: `${loadingPercent}%` }}
              role="progressbar"
              aria-valuenow={loadingPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Cargando frames"
            />
          </div>
        )}
      </div>
    </div>
  );
}
