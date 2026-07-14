import { useEffect, useRef } from 'react';
import { ref, push, onChildAdded, get, query, orderByChild, limitToFirst, remove } from 'firebase/database';
import { db } from '../firebase';

// Stored as normalized coords (0–1) so they work on any screen size
interface Mark {
  x1: number; y1: number;
  x2: number; y2: number;
  w: number;  // stroke width (normalized to screen height)
  op: number; // opacity
}

interface MarkEntry {
  key: string;
  mark: Mark;
}

const MAX_MARKS   = 3000;  // cap total in DB
const SESSION_CAP = 60;    // max marks this visitor saves
const SAVE_DIST   = 14;    // px between saved segments

const COLOR = 'rgba(28,18,10,';

export default function WaterDropHome() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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

    // ── stored marks ──────────────────────────────────────
    const entries: MarkEntry[] = [];

    const drawMark = (m: Mark) => {
      ctx.beginPath();
      ctx.moveTo(m.x1 * cssW, m.y1 * cssH);
      ctx.lineTo(m.x2 * cssW, m.y2 * cssH);
      ctx.strokeStyle = `${COLOR}${m.op.toFixed(3)})`;
      ctx.lineWidth   = m.w * cssH;
      ctx.lineCap     = 'round';
      ctx.stroke();
    };

    // load existing marks then listen for new ones
    const marksRef = ref(db, 'marks');

    get(marksRef).then(snapshot => {
      snapshot.forEach(child => {
        const m = child.val() as Mark;
        entries.push({ key: child.key!, mark: m });
        drawMark(m);
      });

      // prune oldest if over limit
      if (entries.length > MAX_MARKS) {
        const toDelete = entries.splice(0, entries.length - MAX_MARKS);
        toDelete.forEach(e => remove(ref(db, `marks/${e.key}`)));
      }
    });

    // real-time: draw marks from other visitors as they arrive
    onChildAdded(marksRef, snapshot => {
      const key = snapshot.key!;
      if (entries.find(e => e.key === key)) return; // already loaded
      const m = snapshot.val() as Mark;
      entries.push({ key, mark: m });
      drawMark(m);
    });

    // ── stylus ────────────────────────────────────────────
    let sx = cssW * (0.15 + Math.random() * 0.70);
    let sy = cssH * (0.15 + Math.random() * 0.70);
    let angle    = Math.random() * Math.PI * 2;
    let speed    = 22;
    let prevSaveX = sx;
    let prevSaveY = sy;
    let sessionSaved = 0;

    // ── audio ─────────────────────────────────────────────
    let analyser: AnalyserNode | null = null;
    let freqData: Uint8Array | null   = null;
    let energy = 0;

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(stream => {
        const ac  = new AudioContext();
        const src = ac.createMediaStreamSource(stream);
        const an  = ac.createAnalyser();
        an.fftSize = 512;
        an.smoothingTimeConstant = 0.85;
        src.connect(an);
        analyser = an;
        freqData = new Uint8Array(an.frequencyBinCount);
      })
      .catch(() => {});

    const readEnergy = () => {
      if (!analyser || !freqData) return 0;
      analyser.getByteFrequencyData(freqData);
      return freqData.reduce((s, v) => s + v, 0) / freqData.length / 255;
    };

    // ── animation ─────────────────────────────────────────
    let animId: number;
    let lastTime = performance.now();

    const animate = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      energy = energy * 0.92 + readEnergy() * 0.08;

      // audio affects speed and turn randomness
      const currentSpeed    = speed * (1 + energy * 2.8);
      const turnRandness    = 0.012 + energy * 0.06;

      // organic direction drift
      angle += (Math.random() - 0.5) * turnRandness * Math.PI * 2;
      // occasional bigger shift (surface irregularity)
      if (Math.random() < 0.004 + energy * 0.012) {
        angle += (Math.random() - 0.5) * Math.PI * 0.9;
      }

      sx += Math.cos(angle) * currentSpeed * dt;
      sy += Math.sin(angle) * currentSpeed * dt;

      // soft wrap around edges
      if (sx < 0) { sx += cssW; prevSaveX += cssW; }
      if (sx > cssW) { sx -= cssW; prevSaveX -= cssW; }
      if (sy < 0) { sy += cssH; prevSaveY += cssH; }
      if (sy > cssH) { sy -= cssH; prevSaveY -= cssH; }

      // draw active stylus tip
      ctx.beginPath();
      ctx.arc(sx, sy, 0.8, 0, Math.PI * 2);
      ctx.fillStyle = `${COLOR}0.18)`;
      ctx.fill();

      // save segment when moved far enough
      const dist = Math.hypot(sx - prevSaveX, sy - prevSaveY);
      if (dist >= SAVE_DIST && sessionSaved < SESSION_CAP) {
        const m: Mark = {
          x1: prevSaveX / cssW,
          y1: prevSaveY / cssH,
          x2: sx / cssW,
          y2: sy / cssH,
          w:  (0.0004 + Math.random() * 0.0003),
          op: 0.06 + Math.random() * 0.08,
        };
        drawMark(m);
        push(marksRef, m);
        sessionSaved++;
        prevSaveX = sx;
        prevSaveY = sy;
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    const onResize = () => {
      cssW = window.innerWidth;
      cssH = window.innerHeight;
      applySize();
      // redraw all marks on resize
      entries.forEach(e => drawMark(e.mark));
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
