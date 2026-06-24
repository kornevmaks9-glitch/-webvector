import Link from "next/link";
import { SERVICES } from "@/lib/content";
import Reveal from "./Reveal";
import ParallaxBlob from "./ParallaxBlob";

export default function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-24 overflow-hidden px-6 py-24 md:px-12 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <ParallaxBlob
          factor={0.05}
          className="absolute top-0 right-[-8rem] h-[26rem] w-[26rem] rounded-full border border-border-soft"
        />
      </div>

      <Reveal className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2 className="font-display text-[clamp(2rem,5vw,3.2rem)] leading-none uppercase">
          Услуги
        </h2>
        <p className="max-w-sm text-sm text-muted">
          Берём проект от идеи до запуска и сопровождаем после сдачи
        </p>
      </Reveal>

      <div className="grid gap-px overflow-hidden rounded-2xl border border-border-soft md:grid-cols-3">
        {SERVICES.map((service, i) => (
          <Reveal key={service.num} delay={i * 0.1} className="flex">
            <Link
              href={`/services/${service.slug}`}
              className="group relative flex flex-1 flex-col gap-6 bg-background p-8 transition-colors hover:bg-foreground/[0.03] md:p-10"
            >
              <span className="font-display text-sm text-accent">
                {service.num}
              </span>
              <h3 className="font-display text-2xl uppercase">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {service.desc}
              </p>
              <ul className="flex flex-col gap-2 text-xs tracking-wide text-foreground/80 uppercase">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex items-center justify-between pt-4">
                <span className="font-display text-lg">{service.price}</span>
                <span className="text-accent transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
