import React, { useEffect, useMemo, useRef, useState } from 'react';

type ChladniParams = {
  a: number;
  b: number;
  c: number;
  d: number;
  phase1: number;
  phase2: number;
  threshold: number;
  ink: number; // 0..1 probability density for stippling near nodes
};

const randInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

const makeParams = (): ChladniParams => {
  const a = randInt(1, 12);
  const b = randInt(1, 12);
  let c = randInt(1, 12);
  let d = randInt(1, 12);
  if (c === a) c = ((c + randInt(1, 5)) % 12) + 1;
  if (d === b) d = ((d + randInt(1, 5)) % 12) + 1;

  return {
    a,
    b,
    c,
    d,
    phase1: rand(0, Math.PI * 2),
    phase2: rand(0, Math.PI * 2),
    threshold: rand(0.02, 0.07),
    ink: rand(0.35, 0.85),
  };
};

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

// A simple Bayer 4x4 matrix for dithering (0..15)
const bayer4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

interface ChladniBackgroundProps {
  className?: string;
  pixelSize?: number; // larger = chunkier retro pixels
  baseResolution?: { w: number; h: number }; // internal render size
  invert?: boolean;
  showHud?: boolean;
}

const ChladniBackground: React.FC<ChladniBackgroundProps> = ({
  className = '',
  pixelSize = 4,
  baseResolution = { w: 280, h: 180 },
  invert = false,
  showHud = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [seed, setSeed] = useState(0);

  const params = useMemo(() => makeParams(), [seed]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'r') setSeed((s) => s + 1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Render to a low-res buffer, then scale up via CSS.
    const w = Math.max(64, Math.floor(baseResolution.w / Math.max(1, pixelSize)));
    const h = Math.max(64, Math.floor(baseResolution.h / Math.max(1, pixelSize)));

    canvas.width = w;
    canvas.height = h;

    const img = ctx.createImageData(w, h);
    const data = img.data;

    // Normalize domain to [-1, 1], and compute a Chladni-like standing wave mix.
    // Node lines are where the function approaches 0.
    const { a, b, c, d, phase1, phase2, threshold, ink } = params;

    const bg = invert ? 0 : 255;
    const fg = invert ? 255 : 0;

    for (let y = 0; y < h; y++) {
      const ny = (y / (h - 1)) * 2 - 1;
      for (let x = 0; x < w; x++) {
        const nx = (x / (w - 1)) * 2 - 1;

        // Standing wave mixture
        const f1 = Math.sin(a * Math.PI * nx + phase1) * Math.sin(b * Math.PI * ny + phase2);
        const f2 = Math.sin(c * Math.PI * nx - phase2) * Math.sin(d * Math.PI * ny - phase1);
        const f = (f1 + 0.85 * f2) / 1.85;

        const v = Math.abs(f);

        // Turn "near nodes" into ink accumulation via threshold + dither.
        const near = clamp01(1 - v / threshold);

        // Dither so it feels like a low-bit terminal/printout.
        const dither = bayer4[y & 3][x & 3] / 15; // 0..1
        const dot = near * ink > dither ? 1 : 0;

        const i = (y * w + x) * 4;
        const col = dot ? fg : bg;
        data[i + 0] = col;
        data[i + 1] = col;
        data[i + 2] = col;
        data[i + 3] = 255;
      }
    }

    ctx.putImageData(img, 0, 0);
  }, [baseResolution.h, baseResolution.w, invert, params, pixelSize]);

  const label = `CHLADNI / a=${params.a} b=${params.b} c=${params.c} d=${params.d}  |  press R`;

  return (
    <div
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{
        // Subtle CRT vignette/scanline feel without heavy assets.
        background:
          'radial-gradient(120% 120% at 50% 40%, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.06) 70%, rgba(0,0,0,0.12) 100%)',
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-90"
        style={{
          imageRendering: 'pixelated',
          mixBlendMode: 'multiply',
          filter: 'contrast(1.15) brightness(1.05)',
        }}
      />

      {/* scanlines */}
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          background:
            'repeating-linear-gradient(to bottom, rgba(0,0,0,0.10) 0px, rgba(0,0,0,0.10) 1px, rgba(0,0,0,0.00) 3px, rgba(0,0,0,0.00) 4px)',
        }}
      />

      {showHud && (
        <div className="absolute left-8 md:left-12 top-24 md:top-28">
          <div className="bg-white/80 backdrop-blur-[2px] px-2 py-1 rounded-sm">
            <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
              {label}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChladniBackground;
