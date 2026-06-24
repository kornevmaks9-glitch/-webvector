import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { BLOG_POSTS, SERVICES, getPost, getPostCover, type BlogBlock } from "@/lib/content";
import { SITE_URL } from "@/lib/config";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      url: `${SITE_URL}/blog/${post.slug}`,
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ["/opengraph-image"],
    },
  };
}

// Renders **bold** fragments inside a string as <strong>.
function withEmphasis(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-foreground">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  );
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-4 font-display text-2xl uppercase">{block.text}</h2>
      );
    case "p":
      return <p>{withEmphasis(block.text)}</p>;
    case "ul":
      return (
        <ul className="flex flex-col gap-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              <span>{withEmphasis(item)}</span>
            </li>
          ))}
        </ul>
      );
    case "prices":
      return (
        <div className="my-4 overflow-hidden rounded-2xl border border-border-soft">
          {SERVICES.map((service) => (
            <div
              key={service.num}
              className="flex items-center justify-between border-b border-border-soft px-6 py-4 last:border-b-0"
            >
              <span className="text-sm font-semibold uppercase">
                {service.title}
              </span>
              <span className="font-display text-accent">{service.price}</span>
            </div>
          ))}
        </div>
      );
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            dateModified: post.date,
            author: { "@type": "Organization", name: "WebVector" },
            publisher: { "@type": "Organization", name: "WebVector" },
            mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
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
                name: "Блог",
                item: `${SITE_URL}/blog`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: post.title,
                item: `${SITE_URL}/blog/${post.slug}`,
              },
            ],
          }),
        }}
      />
      <Header />

      <main className="flex-1 px-6 py-16 md:px-12 md:py-24">
        <article className="mx-auto max-w-2xl">
          <Link
            href="/blog"
            className="text-xs font-semibold tracking-[0.18em] text-accent uppercase"
          >
            ← Все статьи
          </Link>

          <span className="mt-8 block text-xs tracking-[0.18em] text-muted uppercase">
            {new Date(post.date).toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            · {post.readTime} чтения
          </span>

          <h1 className="mt-4 font-display text-[clamp(2.2rem,7vw,3.6rem)] leading-[0.98] uppercase">
            {post.title}
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-muted">
            {post.excerpt}
          </p>

          <div className="relative mt-10 aspect-[1200/630] w-full overflow-hidden rounded-2xl">
            <Image
              src={getPostCover(post.slug)}
              alt=""
              fill
              priority
              sizes="(min-width: 768px) 672px, 100vw"
              className="object-cover"
            />
          </div>

          <div className="mt-12 flex flex-col gap-6 text-[15px] leading-relaxed text-foreground/90">
            {post.content.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>

          <div className="mt-14 flex flex-col gap-5 rounded-2xl border border-accent/40 bg-accent/[0.04] p-8">
            <span className="font-display text-xl uppercase">
              Нужен сайт для бизнеса?
            </span>
            <p className="text-sm leading-relaxed text-muted">
              WebVector — веб-студия из Смоленска. Делаем{" "}
              <Link href="/services/landing" className="text-accent underline-offset-4 hover:underline">
                лендинги
              </Link>
              ,{" "}
              <Link
                href="/services/internet-magazin"
                className="text-accent underline-offset-4 hover:underline"
              >
                интернет-магазины
              </Link>{" "}
              и{" "}
              <Link
                href="/services/korporativnyy-sayt"
                className="text-accent underline-offset-4 hover:underline"
              >
                корпоративные сайты
              </Link>{" "}
              под ключ. Фиксированная цена и понятные сроки.
            </p>
            <Link
              href="/#contacts"
              className="flex w-fit items-center gap-3 rounded-full border border-accent/70 px-7 py-4 text-xs font-semibold tracking-[0.18em] uppercase transition-colors hover:bg-accent hover:text-background"
            >
              Оставить заявку
              <span>↗</span>
            </Link>
          </div>
        </article>

        <aside className="mx-auto mt-16 max-w-2xl">
          <h2 className="font-display text-2xl uppercase">Читайте также</h2>
          <div className="mt-6 flex flex-col">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="group flex items-center gap-5 border-t border-border-soft py-5 transition-colors last:border-b hover:bg-foreground/[0.03]"
              >
                <div className="relative aspect-[1200/630] w-28 shrink-0 overflow-hidden rounded-lg sm:w-36">
                  <Image
                    src={getPostCover(item.slug)}
                    alt=""
                    fill
                    sizes="144px"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-display text-lg uppercase transition-colors group-hover:text-accent">
                    {item.title}
                  </span>
                  <span className="text-sm leading-relaxed text-muted">
                    {item.excerpt}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </main>

      <ContactSection />
      <Footer />
    </div>
  );
}
