"use client";

import { useEffect, useRef } from "react";

type DevotionalSceneProps = {
  width?: number;
  height?: number;
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
};

const CANVAS_WIDTH = 1600;
const CANVAS_HEIGHT = 900;

export default function DevotionalScene({
  width = CANVAS_WIDTH,
  height = CANVAS_HEIGHT,
  onCanvasReady
}: DevotionalSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.resetTransform();
    ctx.scale(devicePixelRatio, devicePixelRatio);
    ctx.imageSmoothingQuality = "high";

    drawBackground(ctx, width, height);
    drawSun(ctx, width, height);
    drawSunRays(ctx, width, height);
    drawForest(ctx, width, height);
    drawMist(ctx, width, height);
    drawTiger(ctx, width, height);
    drawSaint(ctx, width, height);
    drawHalo(ctx, width, height);
    drawDivineAura(ctx, width, height);
    drawForegroundMist(ctx, width, height);

    onCanvasReady?.(canvas);
  }, [height, onCanvasReady, width]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: `${width}px`,
        margin: "0 auto",
        boxShadow: "0 40px 120px rgba(0, 0, 0, 0.6)",
        borderRadius: "28px",
        overflow: "hidden"
      }}
    >
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}

function drawBackground(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#fcd38f");
  gradient.addColorStop(0.25, "#f8b26b");
  gradient.addColorStop(0.5, "#e67a51");
  gradient.addColorStop(0.75, "#562c36");
  gradient.addColorStop(1, "#0f172a");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  const vignette = ctx.createRadialGradient(width / 2, height * 0.55, width * 0.1, width / 2, height / 2, width * 0.75);
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(1, "rgba(5,6,12,0.45)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, width, height);
}

function drawSun(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const centerX = width * 0.58;
  const centerY = height * 0.35;
  const radius = width * 0.12;
  const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.1, centerX, centerY, radius);
  gradient.addColorStop(0, "rgba(255, 230, 180, 0.95)");
  gradient.addColorStop(0.5, "rgba(255, 198, 120, 0.75)");
  gradient.addColorStop(1, "rgba(255, 170, 90, 0)");

  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawSunRays(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const centerX = width * 0.58;
  const centerY = height * 0.34;
  const rays = 80;
  ctx.save();
  ctx.translate(centerX, centerY);
  for (let i = 0; i < rays; i++) {
    const rayLength = width * 0.65;
    const rayWidth = width * 0.005;
    const gradient = ctx.createLinearGradient(0, 0, rayLength, 0);
    gradient.addColorStop(0, "rgba(255, 220, 160, 0.32)");
    gradient.addColorStop(0.4, "rgba(255, 220, 160, 0.12)");
    gradient.addColorStop(1, "rgba(255, 220, 160, 0)");
    ctx.rotate((Math.PI * 2) / rays);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(0, -rayWidth);
    ctx.lineTo(rayLength, -rayWidth * 4);
    ctx.lineTo(rayLength, rayWidth * 4);
    ctx.lineTo(0, rayWidth);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

function drawForest(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const layers = 8;
  for (let layer = 0; layer < layers; layer++) {
    const layerDepth = layer / layers;
    const baseY = height * (0.55 + layerDepth * 0.25);
    const trees = 22 + layer * 4;
    const color = `rgba(${40 + layer * 18}, ${80 + layer * 24}, ${60 + layer * 18}, ${0.45 - layer * 0.04})`;
    for (let i = 0; i < trees; i++) {
      const x = (width / trees) * i + Math.random() * 40 - 20;
      const treeHeight = height * (0.16 + layerDepth * 0.12) * (0.8 + Math.random() * 0.5);
      drawTree(ctx, x, baseY, treeHeight, color, 8 - layer);
    }
  }
}

function drawTree(
  ctx: CanvasRenderingContext2D,
  baseX: number,
  baseY: number,
  height: number,
  color: string,
  detail: number
) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(baseX, baseY);
  ctx.quadraticCurveTo(baseX - height * 0.1, baseY - height * 0.4, baseX, baseY - height);
  ctx.quadraticCurveTo(baseX + height * 0.1, baseY - height * 0.4, baseX, baseY);
  ctx.fillStyle = color;
  ctx.fill();

  ctx.lineWidth = Math.max(1, height * 0.015);
  ctx.strokeStyle = `rgba(0,0,0,0.08)`;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(baseX, baseY);
  ctx.lineTo(baseX, baseY - height);
  ctx.stroke();

  for (let i = 1; i < detail; i++) {
    const branchY = baseY - (height * i) / detail;
    const branchLength = height * 0.25 * (1 - i / detail);
    ctx.beginPath();
    ctx.moveTo(baseX, branchY);
    ctx.lineTo(baseX - branchLength, branchY - branchLength * 0.2);
    ctx.moveTo(baseX, branchY);
    ctx.lineTo(baseX + branchLength, branchY - branchLength * 0.2);
    ctx.strokeStyle = `rgba(8, 14, 10, 0.1)`;
    ctx.lineWidth = Math.max(0.6, height * 0.006 * (1 - i / detail));
    ctx.stroke();
  }
  ctx.restore();
}

function drawMist(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  const layers = 4;
  for (let i = 0; i < layers; i++) {
    const gradient = ctx.createLinearGradient(0, height * 0.5, 0, height);
    gradient.addColorStop(0, `rgba(220, 245, 255, ${0.02 + i * 0.04})`);
    gradient.addColorStop(1, `rgba(220, 245, 255, ${0.1 - i * 0.015})`);
    ctx.fillStyle = gradient;
    ctx.filter = `blur(${40 - i * 8}px)`;
    ctx.fillRect(0, height * (0.5 + i * 0.08), width, height * 0.2);
  }
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.08;
  for (let i = 0; i < 220; i++) {
    const x = Math.random() * width;
    const y = height * 0.45 + Math.random() * height * 0.4;
    const radius = 40 + Math.random() * 120;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, "rgba(255,255,255,0.16)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawTiger(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const baseX = width * 0.38;
  const baseY = height * 0.72;

  ctx.save();
  ctx.filter = "blur(2px)";
  ctx.fillStyle = "rgba(0,0,0,0.45)";
  ctx.beginPath();
  ctx.ellipse(baseX + 120, baseY + 26, 210, 48, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  const bodyGradient = ctx.createLinearGradient(baseX, baseY - 140, baseX + 360, baseY + 80);
  bodyGradient.addColorStop(0, "#f59f0b");
  bodyGradient.addColorStop(0.4, "#f97316");
  bodyGradient.addColorStop(1, "#b45309");

  ctx.save();
  ctx.fillStyle = bodyGradient;
  ctx.beginPath();
  ctx.moveTo(baseX, baseY);
  ctx.bezierCurveTo(baseX + 120, baseY - 180, baseX + 340, baseY - 150, baseX + 360, baseY);
  ctx.bezierCurveTo(baseX + 380, baseY + 60, baseX + 280, baseY + 86, baseX + 100, baseY + 90);
  ctx.bezierCurveTo(baseX - 40, baseY + 80, baseX - 30, baseY + 20, baseX, baseY);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#f8d19b";
  ctx.beginPath();
  ctx.moveTo(baseX + 40, baseY - 40);
  ctx.quadraticCurveTo(baseX + 80, baseY + 20, baseX + 40, baseY + 50);
  ctx.quadraticCurveTo(baseX + 10, baseY + 26, baseX + 40, baseY - 40);
  ctx.fill();

  ctx.fillStyle = "#f8d19b";
  ctx.beginPath();
  ctx.moveTo(baseX + 260, baseY - 126);
  ctx.quadraticCurveTo(baseX + 330, baseY - 180, baseX + 360, baseY - 80);
  ctx.quadraticCurveTo(baseX + 338, baseY - 56, baseX + 312, baseY - 46);
  ctx.quadraticCurveTo(baseX + 282, baseY - 36, baseX + 260, baseY - 46);
  ctx.fill();

  ctx.fillStyle = "#f97316";
  ctx.beginPath();
  ctx.moveTo(baseX - 10, baseY);
  ctx.quadraticCurveTo(baseX - 32, baseY + 52, baseX + 16, baseY + 90);
  ctx.quadraticCurveTo(baseX + 48, baseY + 100, baseX + 34, baseY + 54);
  ctx.fill();

  ctx.fillStyle = "#f97316";
  ctx.beginPath();
  ctx.moveTo(baseX + 290, baseY - 20);
  ctx.quadraticCurveTo(baseX + 340, baseY + 30, baseX + 324, baseY + 88);
  ctx.quadraticCurveTo(baseX + 286, baseY + 82, baseX + 278, baseY + 10);
  ctx.fill();

  ctx.strokeStyle = "rgba(34, 14, 2, 0.88)";
  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(baseX + 40, baseY - 62);
  ctx.quadraticCurveTo(baseX + 160, baseY - 42, baseX + 260, baseY - 124);
  ctx.stroke();

  const stripePath = (startX: number, startY: number, len: number, angle: number) => {
    const rad = (angle * Math.PI) / 180;
    const endX = startX + Math.cos(rad) * len;
    const endY = startY + Math.sin(rad) * len;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  };

  ctx.lineWidth = 5;
  for (let i = 0; i < 12; i++) {
    stripePath(baseX + 60 + i * 22, baseY - 12 - i * 8, 65, -110 + Math.random() * 22);
  }

  for (let i = 0; i < 5; i++) {
    stripePath(baseX + 260 + i * 14, baseY - 60 - i * 10, 60, -155 + Math.random() * 12);
  }

  ctx.fillStyle = "#130607";
  ctx.beginPath();
  ctx.arc(baseX + 326, baseY - 96, 12, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffe8c6";
  ctx.beginPath();
  ctx.arc(baseX + 322, baseY - 96, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#130607";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(baseX + 332, baseY - 70);
  ctx.quadraticCurveTo(baseX + 316, baseY - 64, baseX + 302, baseY - 58);
  ctx.stroke();

  ctx.restore();
}

function drawSaint(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const baseX = width * 0.47;
  const baseY = height * 0.48;

  ctx.save();
  const robeGradient = ctx.createLinearGradient(baseX - 60, baseY - 140, baseX + 120, baseY + 260);
  robeGradient.addColorStop(0, "#ff7f11");
  robeGradient.addColorStop(0.4, "#ff8f1f");
  robeGradient.addColorStop(0.74, "#f97316");
  robeGradient.addColorStop(1, "#b45309");

  ctx.fillStyle = robeGradient;
  ctx.beginPath();
  ctx.moveTo(baseX, baseY - 60);
  ctx.bezierCurveTo(baseX - 150, baseY + 120, baseX - 60, baseY + 260, baseX + 60, baseY + 260);
  ctx.bezierCurveTo(baseX + 210, baseY + 190, baseX + 120, baseY, baseX + 60, baseY - 50);
  ctx.quadraticCurveTo(baseX + 20, baseY - 120, baseX, baseY - 60);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#fce1c3";
  ctx.beginPath();
  ctx.ellipse(baseX + 12, baseY - 140, 46, 58, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ff8f1f";
  ctx.beginPath();
  ctx.moveTo(baseX - 42, baseY - 158);
  ctx.quadraticCurveTo(baseX + 10, baseY - 220, baseX + 62, baseY - 152);
  ctx.quadraticCurveTo(baseX + 72, baseY - 112, baseX + 52, baseY - 68);
  ctx.quadraticCurveTo(baseX - 18, baseY - 118, baseX - 42, baseY - 158);
  ctx.fill();

  ctx.fillStyle = "#3f1d0b";
  ctx.beginPath();
  ctx.moveTo(baseX - 10, baseY - 148);
  ctx.quadraticCurveTo(baseX + 12, baseY - 110, baseX + 32, baseY - 148);
  ctx.quadraticCurveTo(baseX + 12, baseY - 140, baseX - 10, baseY - 148);
  ctx.fill();

  ctx.strokeStyle = "#3f1d0b";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(baseX - 4, baseY - 128);
  ctx.lineTo(baseX - 2, baseY - 110);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(baseX + 32, baseY - 128);
  ctx.lineTo(baseX + 30, baseY - 108);
  ctx.stroke();

  ctx.strokeStyle = "#2e160b";
  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(baseX + 4, baseY - 104);
  ctx.quadraticCurveTo(baseX + 18, baseY - 96, baseX + 32, baseY - 104);
  ctx.stroke();

  ctx.strokeStyle = "#cbd5f5";
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.moveTo(baseX + 6, baseY - 128);
  ctx.lineTo(baseX + 8, baseY - 114);
  ctx.stroke();

  ctx.strokeStyle = "#e2e8f0";
  ctx.lineWidth = 18;
  ctx.beginPath();
  ctx.moveTo(baseX + 6, baseY - 130);
  ctx.lineTo(baseX - 8, baseY - 130);
  ctx.stroke();

  ctx.strokeStyle = "#fde68a";
  ctx.lineWidth = 18;
  ctx.beginPath();
  ctx.moveTo(baseX + 180, baseY + 60);
  ctx.lineTo(baseX + 180, baseY - 220);
  ctx.stroke();

  ctx.strokeStyle = "#f1c076";
  ctx.lineWidth = 28;
  ctx.beginPath();
  ctx.moveTo(baseX + 180, baseY - 220);
  ctx.lineTo(baseX + 172, baseY - 240);
  ctx.lineTo(baseX + 188, baseY - 240);
  ctx.closePath();
  ctx.stroke();

  ctx.strokeStyle = "#f59e0b";
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(baseX + 180, baseY + 60);
  ctx.lineTo(baseX + 172, baseY + 76);
  ctx.stroke();

  ctx.fillStyle = "#fcd38f";
  ctx.beginPath();
  ctx.moveTo(baseX + 180, baseY - 220);
  ctx.quadraticCurveTo(baseX + 202, baseY - 200, baseX + 180, baseY - 180);
  ctx.quadraticCurveTo(baseX + 152, baseY - 200, baseX + 180, baseY - 220);
  ctx.fill();

  ctx.strokeStyle = "#fcd38f";
  ctx.lineWidth = 24;
  ctx.beginPath();
  ctx.moveTo(baseX + 180, baseY - 220);
  ctx.lineTo(baseX + 180, baseY + 54);
  ctx.stroke();

  ctx.strokeStyle = "#fed7aa";
  ctx.lineWidth = 20;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(baseX - 56, baseY + 72);
  ctx.quadraticCurveTo(baseX + 8, baseY + 56, baseX - 16, baseY - 10);
  ctx.stroke();

  ctx.strokeStyle = "#fde68a";
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(baseX - 64, baseY + 56);
  ctx.quadraticCurveTo(baseX - 16, baseY + 20, baseX - 18, baseY - 28);
  ctx.stroke();

  ctx.strokeStyle = "#fde68a";
  ctx.lineWidth = 18;
  ctx.beginPath();
  ctx.moveTo(baseX + 110, baseY + 64);
  ctx.quadraticCurveTo(baseX + 84, baseY + 36, baseX + 92, baseY - 20);
  ctx.stroke();

  ctx.restore();
}

function drawHalo(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const centerX = width * 0.47 + 12;
  const centerY = height * 0.34;
  const innerRadius = 84;
  const outerRadius = 160;
  const gradient = ctx.createRadialGradient(centerX, centerY, innerRadius, centerX, centerY, outerRadius);
  gradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
  gradient.addColorStop(0.35, "rgba(255, 223, 176, 0.42)");
  gradient.addColorStop(0.72, "rgba(254, 202, 87, 0.16)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawDivineAura(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 320; i++) {
    const x = width * 0.2 + Math.random() * width * 0.6;
    const y = height * 0.1 + Math.random() * height * 0.5;
    const size = 1.5 + Math.random() * 3.8;
    ctx.fillStyle = `rgba(248, 244, 219, ${0.35 + Math.random() * 0.3})`;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let i = 0; i < 160; i++) {
    const x = width * 0.24 + Math.random() * width * 0.52;
    const y = height * 0.2 + Math.random() * height * 0.6;
    const length = 24 + Math.random() * 120;
    const angle = Math.random() * Math.PI * 2;
    const gradient = ctx.createLinearGradient(
      x,
      y,
      x + Math.cos(angle) * length,
      y + Math.sin(angle) * length
    );
    gradient.addColorStop(0, "rgba(255, 202, 120, 0)");
    gradient.addColorStop(0.28, "rgba(255, 227, 160, 0.2)");
    gradient.addColorStop(0.7, "rgba(255, 255, 255, 0.08)");
    gradient.addColorStop(1, "rgba(255, 215, 130, 0)");
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
    ctx.stroke();
  }
  ctx.restore();
}

function drawForegroundMist(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.filter = "blur(32px)";
  ctx.globalAlpha = 0.45;
  const gradient = ctx.createLinearGradient(0, height * 0.66, 0, height);
  gradient.addColorStop(0, "rgba(255,255,255,0.14)");
  gradient.addColorStop(1, "rgba(255,255,255,0.04)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, height * 0.66, width, height * 0.4);
  ctx.restore();
}
