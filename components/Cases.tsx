import { CASES } from "@/lib/content";
import Reveal from "./Reveal";
import ParallaxBlob from "./ParallaxBlob";

export default function Cases() {
  return (
    <section
      id="cases"
      className="relative scroll-mt-24 overflow-hidden border-t border-border-soft px-6 py-24 md:px-12 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <ParallaxBlob
          factor={0.05}
          className="absolute top-0 left-[-8rem] h-[24rem] w-[24rem] rounded-full border border-border-soft"
        />
      </div>

      <Reveal className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2 className="font-display text-[clamp(2rem,5vw,3.2rem)] leading-none uppercase">
          Кейсы
        </h2>
        <p className="max-w-sm text-sm text-muted">
          Несколько проектов и результат, который получили клиенты
        </p>
      </Reveal>

      <div className="grid gap-px overflow-hidden rounded-2xl border border-border-soft md:grid-cols-3">
        {CASES.map((item, i) => (
          <Reveal
            key={item.title}
            delay={i * 0.1}
            className="flex flex-col gap-5 bg-background p-8 md:p-10"
          >
            <span className="text-xs tracking-[0.18em] text-accent uppercase">
              {item.category}
            </span>
            <h3 className="font-display text-xl uppercase">{item.title}</h3>
            <p className="text-sm leading-relaxed text-muted">{item.result}</p>
            <span className="mt-auto font-display text-lg text-accent">
              {item.metric}
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
