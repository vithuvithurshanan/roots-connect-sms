import { useEffect, useRef } from "react";

interface LeafParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  swayPhase: number;
  swayFrequency: number;
  swayAmplitude: number;
  color: string;
  isLandingCapable: boolean;
  state: "falling" | "resting" | "blowing";
  targetElement: HTMLElement | null;
  landedTimer: number;
  landDuration: number;
  restXOffsetPercent: number; // offset relative to card width
}

const LEAF_COLORS = [
  "rgba(101, 163, 13, 0.85)",  // Lime-600
  "rgba(132, 204, 22, 0.9)",   // Lime-500
  "rgba(21, 128, 61, 0.85)",   // Green-700
  "rgba(22, 101, 52, 0.85)",   // Green-800
  "rgba(163, 230, 53, 0.9)",   // Lime-400
  "rgba(217, 119, 6, 0.8)",    // Amber-600 (autumn leaf accent)
];

/**
 * Draws a realistic maple/elm style leaf on canvas
 */
function drawLeaf(ctx: CanvasRenderingContext2D, size: number, color: string) {
  ctx.save();
  ctx.beginPath();
  
  // Leaf stem & body path
  ctx.fillStyle = color;
  ctx.strokeStyle = "rgba(0, 0, 0, 0.15)";
  ctx.lineWidth = 1;

  // Draw natural pointed leaf contour
  ctx.beginPath();
  ctx.moveTo(0, -size / 2);
  ctx.bezierCurveTo(size / 3, -size / 3, size / 2, size / 4, 0, size / 2);
  ctx.bezierCurveTo(-size / 2, size / 4, -size / 3, -size / 3, 0, -size / 2);
  ctx.fill();
  ctx.stroke();

  // Stem
  ctx.beginPath();
  ctx.moveTo(0, size / 2);
  ctx.lineTo(0, size / 2 + size * 0.25);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Center vein
  ctx.beginPath();
  ctx.moveTo(0, -size / 2.5);
  ctx.lineTo(0, size / 2.5);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.restore();
}

export function FallingLeavesBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let prevScrollY = window.scrollY;
    let scrollVelocity = 0;

    // Handle Resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Handle Scroll tracking for wind generation
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = currentScrollY - prevScrollY;
      prevScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Roof query cache
    let cachedRoofs: { element: HTMLElement; rect: DOMRect }[] = [];
    const updateRoofsCache = () => {
      const roofElements = document.querySelectorAll<HTMLElement>(
        '[data-leaf-roof="true"], .hover-lift, article'
      );
      const list: { element: HTMLElement; rect: DOMRect }[] = [];
      roofElements.forEach((el) => {
        const r = el.getBoundingClientRect();
        // Only consider roofs visible on screen or near viewport
        if (r.bottom > -50 && r.top < height + 50 && r.width > 0) {
          list.push({ element: el, rect: r });
        }
      });
      cachedRoofs = list;
    };

    updateRoofsCache();

    // Generate Leaves Particle Array
    const TOTAL_LEAVES = 32;
    const leaves: LeafParticle[] = [];

    for (let i = 0; i < TOTAL_LEAVES; i++) {
      const isLandingCapable = i % 10 < 4; // 40% landing leaves, 60% ambient continuous falling
      leaves.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 12 + 14, // 14px - 26px
        vx: (Math.random() - 0.5) * 0.6,
        vy: Math.random() * 0.8 + 0.9, // fall speed 0.9 - 1.7
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.03,
        swayPhase: Math.random() * Math.PI * 2,
        swayFrequency: Math.random() * 0.02 + 0.015,
        swayAmplitude: Math.random() * 0.8 + 0.4,
        color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
        isLandingCapable,
        state: "falling",
        targetElement: null,
        landedTimer: 0,
        landDuration: Math.floor(Math.random() * 180 + 180), // 3 to 6 seconds @ 60fps
        restXOffsetPercent: 0,
      });
    }

    let frameCount = 0;

    // Main animation loop
    const render = () => {
      frameCount++;
      ctx.clearRect(0, 0, width, height);

      // Periodically refresh roof rect positions for accuracy
      if (frameCount % 15 === 0) {
        updateRoofsCache();
      }

      // Decrypt scroll velocity gradually
      scrollVelocity *= 0.92;

      leaves.forEach((leaf) => {
        const prevY = leaf.y;

        if (leaf.state === "resting" && leaf.targetElement) {
          // Leaf is sitting on top of a card roof
          const rect = leaf.targetElement.getBoundingClientRect();
          const currentRoofY = rect.top;
          const currentRoofX = rect.left + rect.width * leaf.restXOffsetPercent;

          // Check if leaf should blow off (user scrolled fast, or timer expired, or card moved offscreen)
          const windTriggered = Math.abs(scrollVelocity) > 2;
          const timerExpired = leaf.landedTimer >= leaf.landDuration;
          const offscreen = rect.bottom < -50 || rect.top > height + 50;

          if (windTriggered || timerExpired || offscreen) {
            // Blow off roof
            leaf.state = "blowing";
            const windDir = scrollVelocity !== 0 ? Math.sign(scrollVelocity) : (Math.random() > 0.5 ? 1 : -1);
            leaf.vx = windDir * (Math.random() * 2 + 1.5);
            leaf.vy = -Math.random() * 1 - 0.5; // initial upward flutter
            leaf.targetElement = null;
          } else {
            // Keep leaf locked to roof line
            leaf.y = currentRoofY - leaf.size * 0.35;
            leaf.x = currentRoofX;
            leaf.rotation = Math.sin(frameCount * 0.06 + leaf.swayPhase) * 0.18;
            leaf.landedTimer++;
          }
        } else {
          // Leaf is falling or blowing
          if (leaf.state === "blowing") {
            leaf.vx *= 0.96; // dissipate blowing wind boost
            if (Math.abs(leaf.vx) < 0.6) {
              leaf.state = "falling";
            }
          }

          // Apply sway wind & gravity
          const scrollWindEffect = scrollVelocity * 0.05;
          const horizontalSway = Math.sin(frameCount * leaf.swayFrequency + leaf.swayPhase) * leaf.swayAmplitude;
          
          leaf.x += leaf.vx + horizontalSway + scrollWindEffect;
          leaf.y += leaf.vy;
          leaf.rotation += leaf.vRot;

          // Collision Detection for landing-capable leaves
          if (leaf.isLandingCapable && leaf.vy > 0) {
            for (let i = 0; i < cachedRoofs.length; i++) {
              const { element, rect } = cachedRoofs[i];
              const roofTop = rect.top;
              const leafBottom = leaf.y + leaf.size * 0.4;
              const prevLeafBottom = prevY + leaf.size * 0.4;

              // Check if leaf passed through top roof boundary in current frame
              const horizontalHit = leaf.x >= rect.left + 12 && leaf.x <= rect.right - 12;
              const verticalHit = prevLeafBottom <= roofTop + 8 && leafBottom >= roofTop - 4;

              if (horizontalHit && verticalHit) {
                // LAND ON ROOF!
                leaf.state = "resting";
                leaf.targetElement = element;
                leaf.landedTimer = 0;
                leaf.landDuration = Math.floor(Math.random() * 200 + 180);
                leaf.restXOffsetPercent = (leaf.x - rect.left) / rect.width;
                leaf.y = roofTop - leaf.size * 0.35;
                break;
              }
            }
          }

          // Reset when falling off screen bottom or sides
          if (leaf.y > height + 40) {
            leaf.y = -30;
            leaf.x = Math.random() * width;
            leaf.state = "falling";
            leaf.vx = (Math.random() - 0.5) * 0.6;
            leaf.vy = Math.random() * 0.8 + 0.9;
          }
          if (leaf.x < -40) leaf.x = width + 30;
          if (leaf.x > width + 40) leaf.x = -30;
        }

        // Draw leaf at calculated (x, y) & rotation
        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate(leaf.rotation);
        drawLeaf(ctx, leaf.size, leaf.color);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-20 h-full w-full"
      aria-hidden="true"
    />
  );
}
