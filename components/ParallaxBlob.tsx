"use client";

import { useParallax } from "@/lib/useParallax";

export default function ParallaxBlob({
  className,
  factor = 0.08,
}: {
  className: string;
  factor?: number;
}) {
  const ref = useParallax<HTMLDivElement>(factor);

  return <div ref={ref} className={className} />;
}
