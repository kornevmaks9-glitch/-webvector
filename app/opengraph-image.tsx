import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Social-share preview image (Telegram, WhatsApp, VK, X, etc.).
// Generated once at build time into a static PNG.
export const alt = "WebVector — создаём сайты, которые продают";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [latin, cyrillic] = await Promise.all([
    readFile(join(process.cwd(), "app/og-latin.ttf")),
    readFile(join(process.cwd(), "app/og-cyrillic.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#0a0a0a",
          color: "#f2f0eb",
          fontFamily: "PT Sans",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: 34, letterSpacing: "-0.02em" }}>
            WebVector
          </div>
          <div style={{ fontSize: 20, letterSpacing: "0.18em", color: "#8a8a8a" }}>
            СОЗДАНИЕ САЙТОВ
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 104,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              color: "#f2f0eb",
            }}
          >
            Сайты, которые
          </div>
          <div
            style={{
              fontSize: 104,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              color: "#e8c84a",
            }}
          >
            продают
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#8a8a8a" }}>
            Лендинги · магазины · корпоративные сайты — по всей России
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 9999,
              background: "#e8c84a",
            }}
          />
          <div style={{ fontSize: 24 }}>webvector.ru</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "PT Sans", data: latin, weight: 700, style: "normal" },
        { name: "PT Sans", data: cyrillic, weight: 700, style: "normal" },
      ],
    },
  );
}
