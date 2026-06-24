import Link from "next/link";
import { BRAND, CONTACTS, SERVICES } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-border-soft px-6 py-14 md:px-12">
      <div className="grid gap-10 md:grid-cols-4">
        <div className="flex flex-col gap-3">
          <Link href="/" className="font-display text-xl tracking-tight">
            {BRAND}
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            Веб-студия из Смоленска. Создание сайтов под ключ по Смоленску и
            всей России.
          </p>
        </div>

        <nav className="flex flex-col gap-3">
          <span className="text-xs tracking-[0.18em] text-muted uppercase">
            Услуги
          </span>
          {SERVICES.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="text-sm text-foreground/80 transition-colors hover:text-accent"
            >
              {service.title}
            </Link>
          ))}
        </nav>

        <nav className="flex flex-col gap-3">
          <span className="text-xs tracking-[0.18em] text-muted uppercase">
            Разделы
          </span>
          <Link
            href="/#cases"
            className="text-sm text-foreground/80 transition-colors hover:text-accent"
          >
            Кейсы
          </Link>
          <Link
            href="/blog"
            className="text-sm text-foreground/80 transition-colors hover:text-accent"
          >
            Блог
          </Link>
          <Link
            href="/#faq"
            className="text-sm text-foreground/80 transition-colors hover:text-accent"
          >
            Вопросы
          </Link>
          <Link
            href="/#contacts"
            className="text-sm text-foreground/80 transition-colors hover:text-accent"
          >
            Контакты
          </Link>
        </nav>

        <nav className="flex flex-col gap-3">
          <span className="text-xs tracking-[0.18em] text-muted uppercase">
            Контакты
          </span>
          {[CONTACTS.telegram, CONTACTS.vk, CONTACTS.phone, CONTACTS.email].map(
            (contact) => (
              <a
                key={contact.label}
                href={contact.href}
                className="text-sm text-foreground/80 transition-colors hover:text-accent"
              >
                {contact.label}
              </a>
            ),
          )}
        </nav>
      </div>

      <div className="mt-12 flex flex-col gap-2 border-t border-border-soft pt-6 text-xs tracking-wide text-muted uppercase md:flex-row md:justify-between">
        <span>
          {BRAND} © {new Date().getFullYear()}
        </span>
        <span>Создание сайтов под ключ в Смоленске и по всей России</span>
      </div>
    </footer>
  );
}
