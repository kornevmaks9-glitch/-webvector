"use client";

import { useEffect, useRef } from "react";

// Subtly shifts an element as the page scrolls, for a parallax effect.
// Writes the transform straight to the DOM (no re-render) and skips the
// effect entirely for users who prefer reduced motion.
export function useParallax<T extends HTMLElement>(factor: number) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // На тач-экранах параллакс не заметен, но дёргает кадры — пропускаем.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      el.style.transform = `translate3d(0, ${window.scrollY * factor}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [factor]);

  return ref;
}
