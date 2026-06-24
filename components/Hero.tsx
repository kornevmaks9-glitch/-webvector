// Убрали "use client" — Hero теперь серверный компонент.
// ParallaxBlob и HeroVisual остаются клиентскими внутри себя.

import Link from "next/link";
import HeroVisual from "./HeroVisual";
import ParallaxBlob from "./ParallaxBlob";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-10 pb-28 md:px-12 md:pb-36">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-12rem] left-[-8rem] h-[20rem] w-[20rem] animate-drift-slow rounded-full bg-[radial-gradient(circle,rgba(123,92,255,0.32),transparent_70%)] blur-2xl sm:h-[32rem] sm:w-[32rem]" />
        <div className="absolute top-[10%] right-[-10rem] h-[18rem] w-[18rem] animate-drift-slow-reverse rounded-full bg-[radial-gradient(circle,rgba(232,200,74,0.28),transparent_70%)] blur-2xl sm:h-[28rem] sm:w-[28rem]" />
        <ParallaxBlob factor={0.12} className="absolute top-1/4 -left-32 h-[34rem] w-[34rem] rounded-full border border-border-soft" />
        <ParallaxBlob factor={0.26} className="absolute top-1/3 -left-10 h-[20rem] w-[20rem] rounded-full border border-border-soft" />
        <ParallaxBlob factor={0.12} className="absolute right-[-10rem] bottom-[-6rem] h-[28rem] w-[28rem] rounded-full border border-border-soft" />
      </div>

      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="animate-fade-up">
          <h1 className="font-display text-[clamp(2.2rem,7.5vw,5rem)] leading-[0.95] tracking-tight uppercase">
            Сайт под ключ
            <br />
            в Смоленске
            <span className="ml-2 inline-block align-super text-2xl text-accent md:text-3xl">
              ✳
            </span>
            <br />
            <span className="text-accent">от заявки до запуска</span>
          </h1>

          <div className="mt-8 flex max-w-sm items-start gap-3">
            <svg viewBox="0 0 24 24" fill="none" className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" />
              <path d="M3 12h18M12 3c2.5 2.6 4 6 4 9s-1.5 6.4-4 9c-2.5-2.6-4-6-4-9s1.5-6.4 4-9Z" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            <p className="text-sm leading-relaxed text-muted">
              <span className="font-semibold text-foreground">Веб-студия в Смоленске</span>{" "}
              — делаем лендинги, интернет-магазины и корпоративные сайты под ключ. Работаем по Смоленску и всей России
            </p>
          </div>
        </div>

        <div className="animate-fade-up [animation-delay:150ms]">
          <HeroVisual />
        </div>
      </div>

      <div className="mt-16 flex justify-center md:absolute md:right-12 md:bottom-12 md:mt-0 md:justify-end">
        <Link
          href="/#contacts"
          className="group flex items-center gap-3 rounded-full border border-accent/70 bg-background px-7 py-4 text-xs font-semibold tracking-[0.18em] uppercase transition-colors hover:bg-accent hover:text-background"
        >
          Оставить заявку
          <span className="inline-block transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
        </Link>
      </div>
    </section>
  );
}
