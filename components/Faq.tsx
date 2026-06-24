import Reveal from "./Reveal";

type FaqItem = { q: string; a: string };

export default function Faq({
  items,
  title = "Частые вопросы",
}: {
  items: FaqItem[];
  title?: string;
}) {
  return (
    <section
      id="faq"
      className="relative scroll-mt-24 border-t border-border-soft px-6 py-24 md:px-12 md:py-32"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />

      <Reveal>
        <h2 className="font-display text-[clamp(2rem,5vw,3.2rem)] leading-none uppercase">
          {title}
        </h2>
      </Reveal>

      <div className="mx-auto mt-12 max-w-3xl">
        {items.map((item, i) => (
          <Reveal key={item.q} delay={i * 0.05}>
            <details className="group border-t border-border-soft py-6 last:border-b">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-semibold transition-colors hover:text-accent">
                {item.q}
                <span className="shrink-0 text-accent transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                {item.a}
              </p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
