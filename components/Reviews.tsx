import { REVIEWS, AGGREGATE_RATING } from "@/lib/content";
import Reveal from "./Reveal";

// Звёздочки рейтинга — рисуем символами, без иконочных шрифтов.
function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-accent" aria-label={`Оценка ${rating} из 5`}>
      {"★".repeat(rating)}
      <span className="text-border-soft">{"★".repeat(5 - rating)}</span>
    </span>
  );
}

export default function Reviews() {
  return (
    <section className="relative scroll-mt-24 border-t border-border-soft px-6 py-24 md:px-12 md:py-32">
      <Reveal className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2 className="font-display text-[clamp(2rem,5vw,3.2rem)] leading-none uppercase">
          Отзывы
        </h2>
        <p className="max-w-sm text-sm text-muted">
          Средняя оценка{" "}
          <span className="font-semibold text-foreground">
            {AGGREGATE_RATING.value}
          </span>{" "}
          из 5 по {AGGREGATE_RATING.count} отзывам клиентов
        </p>
      </Reveal>

      <div className="grid gap-px overflow-hidden rounded-2xl border border-border-soft md:grid-cols-3">
        {REVIEWS.map((review, i) => (
          <Reveal
            key={review.author}
            delay={i * 0.1}
            className="flex flex-col gap-5 bg-background p-8 md:p-10"
          >
            <Stars rating={review.rating} />
            <p className="flex-1 text-sm leading-relaxed text-foreground/90">
              «{review.text}»
            </p>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold uppercase">
                {review.author}
              </span>
              <span className="text-xs tracking-wide text-muted">
                {review.role}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
