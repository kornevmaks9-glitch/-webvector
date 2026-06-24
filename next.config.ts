import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Обложки блога — статические SVG из /public/blog, без внешних источников.
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
  },
  experimental: {
    // Инлайнит критический CSS прямо в HTML — убирает render-blocking CSS файл
    optimizeCss: true,
    // Инлайнит маленькие CSS файлы вместо отдельных запросов
    inlineCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
