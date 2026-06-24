import { REGIONS } from "@/lib/content";
import Reveal from "./Reveal";
import ParallaxBlob from "./ParallaxBlob";

const STATS = [
  { value: "120+", label: "Сайтов запущено" },
  { value: "6", label: "Лет на рынке" },
  { value: "98%", label: "Клиентов остаются" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 overflow-hidden border-t border-border-soft px-6 py-24 md:px-12 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <ParallaxBlob
          factor={-0.04}
          className="absolute bottom-[-10rem] left-[-6rem] h-[22rem] w-[22rem] rounded-full border border-border-soft"
        />
      </div>

      <div className="grid gap-12 md:grid-cols-2 md:gap-20">
        <Reveal>
          <h2 className="font-display text-[clamp(2rem,5vw,3.2rem)] leading-none uppercase">
            О нас
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
            WebVector — веб-студия из Смоленска. Команда дизайнеров и
            разработчиков, которая делает сайты для бизнеса: от первого лендинга
            до большого интернет-магазина. Без шаблонов и долгих согласований —
            понятные сроки, фиксированная цена и сайт, который реально приводит
            клиентов. Работаем по Смоленску и всей России.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="grid grid-cols-3 gap-6">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2">
              <span className="font-display text-[clamp(2rem,5vw,3rem)] text-accent">
                {stat.value}
              </span>
              <span className="text-xs tracking-wide text-muted uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-16 border-t border-border-soft pt-10 md:mt-20">
        <span className="text-xs tracking-[0.18em] text-muted uppercase">
          География работы
        </span>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          Базируемся в Смоленске, работаем удалённо по всей России — личная
          встреча не нужна, всё согласуем онлайн и созвонами. Чаще всего к нам
          приходят за разработкой сайта из этих регионов:
        </p>
        <ul className="mt-7 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3 lg:grid-cols-4">
          {REGIONS.map((region) => (
            <li
              key={region}
              className="flex items-center gap-2.5 text-sm text-foreground/80"
            >
              <span className="h-1 w-1 shrink-0 rounded-full bg-accent" />
              {region}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
