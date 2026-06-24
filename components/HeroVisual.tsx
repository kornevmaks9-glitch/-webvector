"use client";

import { useRef, useCallback } from "react";

const WINDOWS = [
  { rotate: -8, x: -6,  y: 18,  z: 0, accent: "#7b5cff", lines: ["72%", "44%"] },
  { rotate: 4,  x: 10,  y: 4,   z: 1, accent: "#cabdfa", lines: ["60%", "38%", "50%"] },
  { rotate: -3, x: -2,  y: -10, z: 2, accent: "#e8c84a", lines: ["80%", "55%"] },
];

export default function HeroVisual() {
  const stageRef = useRef<HTMLDivElement>(null);

  // Используем useCallback чтобы не создавать новую функцию при каждом рендере
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage) return;
    // getBoundingClientRect вызываем только внутри requestAnimationFrame
    // чтобы не вызывать forced reflow синхронно
    requestAnimationFrame(() => {
      const rect = stage.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      stage.style.setProperty("--tilt-x", `${(-py * 10).toFixed(2)}deg`);
      stage.style.setProperty("--tilt-y", `${(px * 14).toFixed(2)}deg`);
    });
  }, []);

  const handlePointerLeave = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.setProperty("--tilt-x", "0deg");
    stage.style.setProperty("--tilt-y", "0deg");
  }, []);

  return (
    <div
      ref={stageRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative mx-auto aspect-square w-full max-w-[380px] select-none sm:max-w-[440px] md:max-w-[480px] [perspective:1200px]"
      style={{ "--tilt-x": "0deg", "--tilt-y": "0deg" } as React.CSSProperties}
    >
      <div
        className="absolute inset-[14%] rounded-full opacity-60 blur-xl"
        style={{
          background:
            "radial-gradient(circle, rgba(232,200,74,0.22), rgba(123,92,255,0.14) 55%, transparent 75%)",
        }}
      />

      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: "rotateX(var(--tilt-x)) rotateY(var(--tilt-y))",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {WINDOWS.map((win, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-[#131313] shadow-2xl"
            style={{
              transform: `translate3d(${win.x}%, ${win.y}%, ${win.z * 50}px) rotate(${win.rotate}deg)`,
              boxShadow: `0 30px 70px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(242,240,235,0.06)`,
              borderColor: `${win.accent}33`,
            }}
          >
            <div
              className="flex items-center gap-1.5 border-b px-4 py-3"
              style={{ borderColor: `${win.accent}26`, background: `${win.accent}0d` }}
            >
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: win.accent }} />
              <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
              <span className="ml-2 h-2.5 flex-1 max-w-[60%] rounded-full bg-foreground/10" />
            </div>
            <div className="flex flex-col gap-3 p-5">
              {win.lines.map((w, j) => (
                <span
                  key={j}
                  className="h-2.5 rounded-full"
                  style={{
                    width: w,
                    background: j === 0 ? win.accent : "rgba(242,240,235,0.1)",
                    opacity: j === 0 ? 0.85 : 1,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
