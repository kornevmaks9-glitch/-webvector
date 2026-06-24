import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS, getPostCover } from "@/lib/content";
import Reveal from "./Reveal";
import ParallaxBlob from "./ParallaxBlob";

const RECENT = BLOG_POSTS.slice(0, 3);

export default function BlogPreview() {
  return (
    <section className="relative overflow-hidden border-t border-border-soft px-6 py-24 md:px-12 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <ParallaxBlob
          factor={0.06}
          className="absolute top-[-8rem] right-[-4rem] h-[20rem] w-[20rem] rounded-full border border-border-soft"
        />
      </div>

      <Reveal className="mb-12 flex items-end justify-between gap-4">
        <h2 className="font-display text-[clamp(2rem,5vw,3.2rem)] leading-none uppercase">
          Блог
        </h2>
        <Link
          href="/blog"
          className="group flex shrink-0 items-center gap-2 text-xs font-semibold tracking-[0.18em] text-accent uppercase"
        >
          Все статьи
          <span className="inline-block transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
            ↗
          </span>
        </Link>
      </Reveal>

      <div className="grid gap-px overflow-hidden rounded-2xl border border-border-soft md:grid-cols-3">
        {RECENT.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.1} className="flex">
            <Link
              href={`/blog/${post.slug}`}
              className="group flex flex-1 flex-col bg-background transition-colors hover:bg-foreground/[0.03]"
            >
              <div className="relative aspect-[1200/630] w-full overflow-hidden">
                <Image
                  src={getPostCover(post.slug)}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-8 md:p-10">
                <span className="text-xs tracking-[0.18em] text-muted uppercase">
                  {new Date(post.date).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <h3 className="font-display text-xl uppercase transition-colors group-hover:text-accent">
                  {post.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {post.excerpt}
                </p>
                <span className="mt-auto flex items-center gap-2 pt-2 text-xs font-semibold tracking-[0.18em] text-accent uppercase">
                  Читать
                  <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
