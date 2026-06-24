import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Faq from "@/components/Faq";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { SERVICES, getService } from "@/lib/content";
import { SITE_URL } from "@/lib/config";

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      type: "website",
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${SITE_URL}/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const priceNumber = service.price.replace(/\D/g, "");

  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            serviceType: service.title,
            description: service.metaDescription,
            areaServed: "Смоленск",
            provider: { "@type": "Organization", name: "WebVector" },
            offers: {
              "@type": "Offer",
              price: priceNumber,
              priceCurrency: "RUB",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
              {
                "@type": "ListItem",
                position: 2,
                name: "Услуги",
                item: `${SITE_URL}/#services`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: service.title,
                item: `${SITE_URL}/services/${service.slug}`,
              },
            ],
          }),
        }}
      />
      <Header />

      <main className="flex-1">
        <section className="px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/#services"
              className="text-xs font-semibold tracking-[0.18em] text-accent uppercase"
            >
              ← Все услуги
            </Link>

            <h1 className="mt-8 font-display text-[clamp(2rem,6vw,3.4rem)] leading-[1] uppercase">
              {service.h1}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted">
              {service.intro}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4 border-y border-border-soft py-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs tracking-[0.18em] text-muted uppercase">
                  Цена
                </span>
                <span className="font-display text-2xl text-accent">
                  {service.price}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs tracking-[0.18em] text-muted uppercase">
                  Срок
                </span>
                <span className="font-display text-2xl">
                  {service.timeline}
                </span>
              </div>
            </div>

            <h2 className="mt-14 font-display text-2xl uppercase">
              Что входит
            </h2>
            <ul className="mt-6 flex flex-col gap-3">
              {service.includes.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-relaxed">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-14 font-display text-2xl uppercase">Кому подойдёт</h2>
            <p className="mt-6 text-[15px] leading-relaxed text-foreground/90">
              {service.audience}
            </p>

            <div className="mt-12 flex flex-col gap-5 rounded-2xl border border-accent/40 bg-accent/[0.04] p-8">
              <span className="font-display text-xl uppercase">
                Обсудим ваш проект?
              </span>
              <p className="text-sm leading-relaxed text-muted">
                Расскажите задачу — посчитаем точную цену и срок за 15 минут.
              </p>
              <Link
                href="/#contacts"
                className="flex w-fit items-center gap-3 rounded-full border border-accent/70 px-7 py-4 text-xs font-semibold tracking-[0.18em] uppercase transition-colors hover:bg-accent hover:text-background"
              >
                Оставить заявку
                <span>↗</span>
              </Link>
            </div>
          </div>
        </section>

        <Faq items={service.faq} title="Вопросы по услуге" />
      </main>

      <ContactSection />
      <Footer />
    </div>
  );
}
