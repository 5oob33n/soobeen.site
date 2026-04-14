import React, { useEffect, useMemo, useRef, useState } from 'react';

type ChladniParams = {
  a: number;
  b: number;
  c: number;
  d: number;
  phase1: number;
  phase2: number;
  threshold: number;
  ink: number;
};

type ChladniMode = 'random' | 'frequency';

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

const makeParamsFromFrequency = (frequencyHz: number): ChladniParams => {
  const f = Number.isFinite(frequencyHz) ? Math.max(1, Math.min(20000, frequencyHz)) : 440;
  const n = Math.round(f);

  const a = (n % 12) + 1;
  const b = (Math.floor(n / 3) % 12) + 1;
  let c = (Math.floor(n / 7) % 12) + 1;
  let d = (Math.floor(n / 11) % 12) + 1;
  if (c === a) c = ((c + 5) % 12) + 1;
  if (d === b) d = ((d + 7) % 12) + 1;

  const frac = f - Math.floor(f);
  const phase1 = ((n * 0.017) % 1) * Math.PI * 2;
  const phase2 = (((n * 0.031 + frac) % 1) * Math.PI * 2);

  const threshold = 0.03 + (Math.sin(f * 0.01) * 0.015 + 0.015) * 0.35;
  const ink = 0.45 + 0.4 * (0.5 + 0.5 * Math.sin(f * 0.005 + 1.2));

  return { a, b, c, d, phase1, phase2, threshold, ink };
};

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

const bayer4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

interface ChladniBackgroundProps {
  className?: string;
  pixelSize?: number;
  baseResolution?: { w: number; h: number };
  invert?: boolean;
  showHud?: boolean;
  mode?: ChladniMode;
  frequencyHz?: number;
  animate?: boolean;
  animationSpeed?: number;
  /** Residual layers + micro phase drift — aligns with trace / excavation themes */
  excavation?: boolean;
  scanlineOpacity?: number;
}

const ChladniBackground: React.FC<ChladniBackgroundProps> = ({
  className = '',
  pixelSize = 4,
  baseResolution = { w: 280, h: 180 },
  invert = false,
  showHud = true,
  mode = 'random',
  frequencyHz,
  animate = false,
  animationSpeed = 1,
  excavation = false,
  scanlineOpacity = 0.1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const residueRef = useRef<Uint8ClampedArray | null>(null);
  const residueSizeRef = useRef(0);
  const [seed, setSeed] = useState(0);

  const params = useMemo(() => {
    if (mode === 'frequency') return makeParamsFromFrequency(frequencyHz ?? 440);
    return makeParams();
  }, [frequencyHz, mode, seed]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (mode !== 'random') return;
      if (e.key.toLowerCase() === 'r') setSeed((s) => s + 1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    residueRef.current = null;
    residueSizeRef.current = 0;

    const w = Math.max(64, Math.floor(baseResolution.w / Math.max(1, pixelSize)));
    const h = Math.max(64, Math.floor(baseResolution.h / Math.max(1, pixelSize)));

    canvas.width = w;
    canvas.height = h;

    const img = ctx.createImageData(w, h);
    const data = img.data;

    const bg = invert ? 0 : 255;
    const fg = invert ? 255 : 0;

    const fillFrame = (
      timeSec: number,
      opts: { drift: boolean; breath: boolean }
    ) => {
      const { a, b, c, d, phase1, phase2, threshold, ink } = params;
      let p1 = phase1;
      let p2 = phase2;
      let th = threshold;
      let inkUse = ink;

      if (opts.drift) {
        const spd = Math.max(0, animationSpeed) * 0.18;
        const micro =
          Math.sin(timeSec * 0.62) * 0.07 +
          Math.sin(timeSec * 1.9) * 0.025 +
          Math.sin(timeSec * 5.3) * 0.008;
        p1 = phase1 + timeSec * spd + micro;
        p2 = phase2 + timeSec * spd * 0.68 - micro * 0.45;
      }

      if (opts.breath) {
        th = threshold * (1 + 0.11 * Math.sin(timeSec * 0.24));
        inkUse = ink * (0.9 + 0.1 * Math.sin(timeSec * 0.17 + 1.3));
      }

      for (let y = 0; y < h; y++) {
        const ny = (y / (h - 1)) * 2 - 1;
        for (let x = 0; x < w; x++) {
          const nx = (x / (w - 1)) * 2 - 1;

          const f1 = Math.sin(a * Math.PI * nx + p1) * Math.sin(b * Math.PI * ny + p2);
          const f2 = Math.sin(c * Math.PI * nx - p2) * Math.sin(d * Math.PI * ny - p1);
          const f = (f1 + 0.85 * f2) / 1.85;
          const v = Math.abs(f);
          const near = clamp01(1 - v / th);
          const dither = bayer4[y & 3][x & 3] / 15;
          const dot = near * inkUse > dither ? 1 : 0;

          const i = (y * w + x) * 4;
          const col = dot ? fg : bg;
          data[i + 0] = col;
          data[i + 1] = col;
          data[i + 2] = col;
          data[i + 3] = 255;
        }
      }
    };

    if (!animate) {
      fillFrame(0, { drift: false, breath: false });
      ctx.putImageData(img, 0, 0);
      return;
    }

    let raf = 0;
    const t0 = performance.now();

    const loop = (now: number) => {
      const timeSec = (now - t0) * 0.001;
      const useExcavation = excavation;

      fillFrame(timeSec, { drift: true, breath: useExcavation });

      if (useExcavation) {
        const need = w * h * 4;
        if (!residueRef.current || residueSizeRef.current !== need) {
          residueRef.current = new Uint8ClampedArray(need);
          residueSizeRef.current = need;
          for (let i = 0; i < need; i += 4) {
            residueRef.current[i] = bg;
            residueRef.current[i + 1] = bg;
            residueRef.current[i + 2] = bg;
            residueRef.current[i + 3] = 255;
          }
        }
        const res = residueRef.current;
        const decay = 0.94;
        const mix = 1 - decay;
        for (let i = 0; i < need; i += 4) {
          res[i + 0] = res[i + 0] * decay + data[i + 0] * mix;
          res[i + 1] = res[i + 1] * decay + data[i + 1] * mix;
          res[i + 2] = res[i + 2] * decay + data[i + 2] * mix;
          res[i + 3] = 255;
        }
        img.data.set(res);
        ctx.putImageData(img, 0, 0);
      } else {
        ctx.putImageData(img, 0, 0);
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [
    animate,
    animationSpeed,
    baseResolution.h,
    baseResolution.w,
    excavation,
    invert,
    params,
    pixelSize,
  ]);

  const label =
    mode === 'frequency'
      ? `CHLADNI / ${Math.round(frequencyHz ?? 440)}HZ  |  a=${params.a} b=${params.b} c=${params.c} d=${params.d}`
      : `CHLADNI / a=${params.a} b=${params.b} c=${params.c} d=${params.d}  |  press R`;

  return (
    <div
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{
        background:
          'radial-gradient(120% 120% at 50% 42%, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.05) 72%, rgba(0,0,0,0.11) 100%)',
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-[0.94]"
        style={{
          imageRendering: 'pixelated',
          mixBlendMode: excavation ? 'darken' : 'multiply',
          filter: excavation ? 'contrast(1.08) brightness(1.02)' : 'contrast(1.15) brightness(1.05)',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          opacity: scanlineOpacity,
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
