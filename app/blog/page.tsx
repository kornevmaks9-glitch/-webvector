import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { BLOG_POSTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Блог о создании и покупке сайтов",
  description:
    "Как купить готовый сайт, заказать сайт под ключ, не переплатить и не нарваться на риски. Разбираем цены, ниши и безопасные сделки простым языком.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <Header />

      <main className="flex-1 px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-[clamp(2.2rem,7vw,3.6rem)] leading-[0.98] uppercase">
            Блог
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted">
            Честно о том, как покупать и заказывать сайты: цены, ниши,
            безопасные сделки и где обычно прячется переплата.
          </p>

          <div className="mt-14 flex flex-col">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-3 border-t border-border-soft py-8 transition-colors last:border-b hover:bg-foreground/[0.03]"
              >
                <span className="text-xs tracking-[0.18em] text-muted uppercase">
                  {new Date(post.date).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  · {post.readTime} чтения
                </span>
                <h2 className="font-display text-2xl uppercase transition-colors group-hover:text-accent md:text-3xl">
                  {post.title}
                </h2>
                <p className="max-w-2xl text-sm leading-relaxed text-muted">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <ContactSection />
      <Footer />
    </div>
  );
}
