import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
