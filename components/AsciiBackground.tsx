import React, { useRef, useEffect } from 'react';

interface AsciiBackgroundProps {
  intensity?: number; // 0 to 1
  interactive?: boolean;
}

const AsciiBackground: React.FC<AsciiBackgroundProps> = ({ intensity = 1.0, interactive = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Standard density map
    const chars = "      `.:,-~+*o°/";
    // Decomposition/Crack chars for the interaction
    const crackChars = " .*/-";
    
    let animationFrameId: number;
    let time = 0;
    
    // Ripple effect state
    let rippleStrength = 0;
    const rippleDecay = 0.95;

    // Mouse interaction
    const mouse = { x: -1000, y: -1000 };
    const targetMouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
    };

    const handleWheel = (e: WheelEvent) => {
      rippleStrength += Math.abs(e.deltaY) * 0.05;
      if (rippleStrength > 50) rippleStrength = 50;
    };
    
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('wheel', handleWheel);
    }

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    window.addEventListener('resize', resize);
    resize();

    // 3D Noise function (Simplex-like logic)
    const noise = (x: number, y: number, z: number) => {
        return (
            Math.sin(x * 1.0 + z) * 0.5 + 
            Math.cos(y * 1.2 + z) * 0.5 +
            Math.sin((x + y) * 0.5 + z * 1.5) * 0.5
        );
    };

    const draw = () => {
      // Clear
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#000000';
      const fontSize = 12;
      ctx.font = `bold ${fontSize}px monospace`;
      
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cols = Math.ceil(w / (fontSize * 0.6));
      const rows = Math.ceil(h / fontSize);

      // Smooth mouse follow
      if (interactive) {
        mouse.x += (targetMouse.x - mouse.x) * 0.1;
        mouse.y += (targetMouse.y - mouse.y) * 0.1;
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
      }

      time += 0.01;
      rippleStrength = interactive ? rippleStrength * rippleDecay : 0;

      const cx = cols / 2;
      const cy = rows / 2;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const pixelX = x * (fontSize * 0.6);
          const pixelY = y * fontSize;

          // Distance to mouse (Interaction Zone)
          const dx = pixelX - mouse.x;
          const dy = pixelY - mouse.y;
          const mouseDist = Math.sqrt(dx*dx + dy*dy);
          
          // "Disappearance" Threshold
          // The closer the mouse, the stronger the decomposition effect
          const interactionRadius = 80; // Reduced radius for a tighter interaction circle
          let decompositionFactor = 0;
          
          if (mouseDist < interactionRadius) {
            decompositionFactor = 1 - (mouseDist / interactionRadius); // 1 at center, 0 at edge
            // Ease-in for smoother edge
            decompositionFactor = decompositionFactor * decompositionFactor; 
          }

          const nx = (x - cx) / cx; 
          const ny = (y - cy) / cy; 
          
          // Ripple Distortion based on scroll
          const ripple = Math.sin(Math.sqrt(nx*nx + ny*ny) * 20 - time * 5) * rippleStrength * 0.01;

          // Base Organic Noise
          const noiseVal = noise(
              nx * 3 + ripple, 
              ny * 3 + ripple, 
              time * 0.5
          );

          // Calculate Density
          // Base form + noise. Note: We DO NOT add mouse 'light' here anymore.
          // Instead, the mouse destroys the form.
          const distFromCenter = Math.sqrt(nx*nx + ny*ny);
          let density = (1 - distFromCenter * 0.8) + noiseVal * 0.5;

          // Clamp density
          if (density < 0) density = 0;
          if (density > 1) density = 1;

          // Determine Character
          let char = '';
          
          if (decompositionFactor > 0.1) {
            // INTERACTION: DECOMPOSITION
            // If mouse is close, probability of showing a "crack" or "dot" increases
            // The closer the mouse, the sparser/lighter the character becomes
            
            // Randomly scatter positions slightly when decomposing (entropy increase)
            const scatter = decompositionFactor * 15; 
            const jX = (Math.random() - 0.5) * scatter;
            const jY = (Math.random() - 0.5) * scatter;

            // Reduce opacity near the cursor ("Disappearing")
            ctx.globalAlpha = Math.max(0.1, intensity * (1 - decompositionFactor));

            // Select from "Crack/Residue" chars instead of density map
            if (Math.random() > 0.5) {
                const charIndex = Math.floor(Math.random() * crackChars.length);
                char = crackChars[charIndex];
            } else {
                char = '.'; // Just a speck
            }

            if (char !== ' ') {
                 ctx.fillText(char, pixelX + jX, pixelY + jY);
            }

          } else {
            // NORMAL STATE: Cohesive Form
            const charIndex = Math.floor(density * (chars.length - 1));
            char = chars[charIndex];
            
            // Apply slight jitter from ripple
            const jitterX = (Math.random() - 0.5) * rippleStrength * 0.2;
            const jitterY = (Math.random() - 0.5) * rippleStrength * 0.2;

            ctx.globalAlpha = intensity;
            if (char !== ' ') {
                ctx.fillText(char, pixelX + jitterX, pixelY + jitterY);
            }
          }
        }
      }
      // Reset alpha
      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('wheel', handleWheel);
      }
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};

export default AsciiBackground;