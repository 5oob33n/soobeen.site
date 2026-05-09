import { useEffect, useRef } from 'react';

// --- types ---
interface Stone {
  pts: { x: number; y: number }[];
  rotation: number;
  scale: number;
}

interface Particle {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  opacity: number;
  stone: Stone;
}

// --- Chladni modes: [m, n] low→high frequency order ---
const MODES: [number, number][] = [
  [1, 2], [2, 3], [1, 3], [3, 4], [2, 5], [3, 5], [4, 5], [3, 6],
];

// Frequency bands (Hz) mapped to mode indices
const BAND_RANGES: [number, number][] = [
  [20,  150],
  [150, 350],
  [350, 700],
  [700, 1400],
  [1400, 2800],
  [2800, 5000],
  [5000, 9000],
  [9000, 20000],
];

// --- Chladni math ---
function chladni(x: number, y: number, m: number, n: number): number {
  return Math.sin(m * Math.PI * x) * Math.sin(n * Math.PI * y);
}

function findNodalPoints(m: number, n: number, count: number) {
  const pts: { x: number; y: number }[] = [];
  let tries = 0;
  while (pts.length < count && tries < count * 60) {
    tries++;
    const x = 0.02 + Math.random() * 0.96;
    const y = 0.02 + Math.random() * 0.96;
    if (Math.abs(chladni(x, y, m, n)) < 0.07) pts.push({ x, y });
  }
  return pts;
}

// --- Stone shape generator ---
function generateStone(baseRadius: number): Stone {
  const numPts = 7 + Math.floor(Math.random() * 3);
  const ySquash = 0.55 + Math.random() * 0.45; // flatter = more stone-like
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < numPts; i++) {
    const angle = (i / numPts) * Math.PI * 2;
    const r = baseRadius * (0.6 + Math.random() * 0.7);
    const jitter = (Math.random() - 0.5) * (Math.PI * 2 / numPts) * 0.45;
    pts.push({
      x: Math.cos(angle + jitter) * r,
      y: Math.sin(angle + jitter) * r * ySquash,
    });
  }
  return {
    pts,
    rotation: Math.random() * Math.PI * 2,
    scale: 1,
  };
}

function drawStone(
  ctx: CanvasRenderingContext2D,
  stone: Stone,
  px: number,
  py: number,
  opacity: number
) {
  const { pts, rotation } = stone;
  const n = pts.length;
  ctx.save();
  ctx.translate(px, py);
  ctx.rotate(rotation);
  ctx.globalAlpha = opacity;
  ctx.fillStyle = '#1a1a1a';
  ctx.beginPath();
  const s0x = (pts[n - 1].x + pts[0].x) / 2;
  const s0y = (pts[n - 1].y + pts[0].y) / 2;
  ctx.moveTo(s0x, s0y);
  for (let i = 0; i < n; i++) {
    const cur = pts[i];
    const nxt = pts[(i + 1) % n];
    ctx.quadraticCurveTo(cur.x, cur.y, (cur.x + nxt.x) / 2, (cur.y + nxt.y) / 2);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
  ctx.globalAlpha = 1;
}

// --- constants ---
const NUM_PARTICLES = 320;
const MODE_HOLD_MS  = 48000; // auto-switch interval when no audio
const TRANSITION_SEC = 14;
const VOTE_INTERVAL_FRAMES = 120; // ~4s at 30fps

export default function ChladniHome() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // --- canvas setup with DPR ---
    const dpr = window.devicePixelRatio || 1;
    let cssW = window.innerWidth;
    let cssH = window.innerHeight;

    const applySize = () => {
      canvas.width  = cssW * dpr;
      canvas.height = cssH * dpr;
      canvas.style.width  = cssW + 'px';
      canvas.style.height = cssH + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    applySize();

    // --- pre-generate stone shapes ---
    const stoneLibrary: Stone[] = Array.from({ length: 18 }, () =>
      generateStone(2.5 + Math.random() * 3.5)
    );

    // --- particle helpers ---
    let modeIndex = 0;
    let [m, n] = MODES[modeIndex];

    const pickTargets = (m: number, n: number) => {
      const nodal = findNodalPoints(m, n, NUM_PARTICLES * 4);
      return Array.from({ length: NUM_PARTICLES }, () => {
        const pt = nodal.length > 0
          ? nodal[Math.floor(Math.random() * nodal.length)]
          : { x: Math.random(), y: Math.random() };
        return { x: pt.x * cssW, y: pt.y * cssH };
      });
    };

    let targets = pickTargets(m, n);

    const particles: Particle[] = Array.from({ length: NUM_PARTICLES }, (_, i) => ({
      x: Math.random() * cssW,
      y: Math.random() * cssH,
      tx: targets[i].x,
      ty: targets[i].y,
      vx: 0,
      vy: 0,
      opacity: 0.20 + Math.random() * 0.22,
      stone: stoneLibrary[Math.floor(Math.random() * stoneLibrary.length)],
    }));

    // --- transition state ---
    let transitioning = false;
    let transitionProgress = 0;
    let oldTargets: { x: number; y: number }[] = [];
    let newTargets: { x: number; y: number }[] = [];
    let nextAutoSwitch = Date.now() + MODE_HOLD_MS;

    const triggerTransition = (toIndex: number) => {
      if (transitioning || toIndex === modeIndex) return;
      modeIndex = toIndex;
      [m, n] = MODES[modeIndex];
      oldTargets = particles.map(p => ({ x: p.tx, y: p.ty }));
      newTargets = pickTargets(m, n);
      transitioning = true;
      transitionProgress = 0;
      nextAutoSwitch = Date.now() + MODE_HOLD_MS;
    };

    // --- audio setup ---
    let analyser: AnalyserNode | null = null;
    let freqData: Uint8Array | null = null;
    let modeVotes = new Array(MODES.length).fill(0);
    let voteFrame = 0;
    let audioActive = false;

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(stream => {
        const audioCtx = new AudioContext();
        const src = audioCtx.createMediaStreamSource(stream);
        const an = audioCtx.createAnalyser();
        an.fftSize = 1024;
        an.smoothingTimeConstant = 0.82;
        src.connect(an);
        analyser = an;
        freqData = new Uint8Array(an.frequencyBinCount);
        audioActive = true;
      })
      .catch(() => { /* no mic — use auto-switch */ });

    const readAudioMode = (): number | null => {
      if (!analyser || !freqData) return null;
      analyser.getByteFrequencyData(freqData);
      const totalEnergy = freqData.reduce((s, v) => s + v, 0) / freqData.length;
      if (totalEnergy < 4) return null; // silence → no vote

      const binHz = analyser.context.sampleRate / analyser.fftSize;
      let maxE = 0, band = 0;
      BAND_RANGES.forEach(([lo, hi], idx) => {
        const lo_i = Math.max(0, Math.floor(lo / binHz));
        const hi_i = Math.min(freqData!.length - 1, Math.floor(hi / binHz));
        let e = 0;
        for (let i = lo_i; i <= hi_i; i++) e += freqData![i];
        e /= Math.max(1, hi_i - lo_i + 1);
        if (e > maxE) { maxE = e; band = idx; }
      });
      return Math.min(band, MODES.length - 1);
    };

    // --- animation loop ---
    let animId: number;
    let lastTime = performance.now();

    const animate = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // --- audio voting ---
      if (audioActive) {
        const band = readAudioMode();
        if (band !== null) modeVotes[band]++;
        voteFrame++;
        if (voteFrame >= VOTE_INTERVAL_FRAMES) {
          const winner = modeVotes.indexOf(Math.max(...modeVotes));
          triggerTransition(winner);
          modeVotes = new Array(MODES.length).fill(0);
          voteFrame = 0;
        }
      } else if (!transitioning && Date.now() > nextAutoSwitch) {
        triggerTransition((modeIndex + 1) % MODES.length);
      }

      // --- update transition ---
      if (transitioning) {
        transitionProgress = Math.min(transitionProgress + dt / TRANSITION_SEC, 1);
        const t = transitionProgress;
        const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        for (let i = 0; i < NUM_PARTICLES; i++) {
          particles[i].tx = oldTargets[i].x + (newTargets[i].x - oldTargets[i].x) * ease;
          particles[i].ty = oldTargets[i].y + (newTargets[i].y - oldTargets[i].y) * ease;
        }
        if (transitionProgress >= 1) transitioning = false;
      }

      // --- draw ---
      ctx.clearRect(0, 0, cssW, cssH);

      for (const p of particles) {
        const dx = p.tx - p.x;
        const dy = p.ty - p.y;
        p.vx += dx * 0.0020;
        p.vy += dy * 0.0020;
        p.vx *= 0.93;
        p.vy *= 0.93;
        p.vx += (Math.random() - 0.5) * 0.014;
        p.vy += (Math.random() - 0.5) * 0.014;
        p.x += p.vx;
        p.y += p.vy;

        drawStone(ctx, p.stone, p.x, p.y, p.opacity);
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    const onResize = () => {
      cssW = window.innerWidth;
      cssH = window.innerHeight;
      applySize();
      const t = pickTargets(m, n);
      particles.forEach((p, i) => { p.tx = t[i].x; p.ty = t[i].y; });
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
