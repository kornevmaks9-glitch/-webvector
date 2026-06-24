import type { MetadataRoute } from "next";
import { BLOG_POSTS, SERVICES } from "@/lib/content";
import { SITE_URL } from "@/lib/config";

// Статьи младше 3 месяцев Яндекс/Google переобходят чаще.
const NINETY_DAYS_MS = 90 * 24 * 60 * 60 * 1000;

export default function sitemap(): MetadataRoute.Sitemap {
  const posts: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => {
    const isRecent = Date.now() - new Date(post.date).getTime() < NINETY_DAYS_MS;
    return {
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: isRecent ? "monthly" : "yearly",
      priority: 0.6,
    };
  });

  const services: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...services,
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...posts,
  ];
}
