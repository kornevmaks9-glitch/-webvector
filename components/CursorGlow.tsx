"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Не запускаем на тач-устройствах — там курсора нет
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let x = 0;
    let y = 0;

    function handleMove(e: PointerEvent) {
      x = e.clientX;
      y = e.clientY;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          const el = ref.current;
          if (!el) return;
          el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
          el.style.opacity = "1";
        });
      }
    }

    function handleLeave() {
      const el = ref.current;
      if (el) el.style.opacity = "0";
    }

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerleave", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 -z-10 hidden h-[420px] w-[420px] rounded-full opacity-0 md:block"
      style={{
        background:
          "radial-gradient(circle, rgba(232,200,74,0.16), rgba(123,92,255,0.08) 40%, transparent 70%)",
        mixBlendMode: "screen",
        // will-change подсказывает браузеру заранее выделить слой — нет forced reflow
        willChange: "transform, opacity",
        transitionProperty: "opacity",
        transitionDuration: "400ms",
        transitionTimingFunction: "ease-out",
      }}
    />
  );
}
