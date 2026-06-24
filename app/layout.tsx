import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import CursorGlow from "@/components/CursorGlow";
import { CONTACTS, REGIONS, REVIEWS, AGGREGATE_RATING } from "@/lib/content";
import { SITE_URL, YANDEX_METRIKA_ID, YANDEX_VERIFICATION } from "@/lib/config";

const PHONE = CONTACTS.phone.href.replace("tel:", "");
const EMAIL = CONTACTS.email.href.replace("mailto:", "");

const geistSans = localFont({
  src: [
    { path: "../public/fonts/geist-cyrillic.woff2", weight: "100 900", style: "normal" },
    { path: "../public/fonts/geist-latin.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-geist-sans",
  display: "swap",
  preload: true,
  adjustFontFallback: "Arial",
});

const unbounded = localFont({
  src: [
    { path: "../public/fonts/unbounded-cyrillic.woff2", weight: "800", style: "normal" },
    { path: "../public/fonts/unbounded-latin.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-anton",
  display: "swap",
  preload: true,
  adjustFontFallback: "Arial",
});

const TITLE = "Создание сайтов под ключ в Смоленске | WebVector";
const DESCRIPTION =
  "Создание сайтов под ключ в Смоленске: лендинги от 30 000 ₽, интернет-магазины и корпоративные сайты. Фиксированная цена, сроки от 5 дней. Работаем по Смоленску и всей России.";

const OG_IMAGE = `${SITE_URL}/og-image.png`;
const LOGO_URL  = `${SITE_URL}/logo.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s — WebVector" },
  description: DESCRIPTION,
  keywords: [
    "создание сайтов под ключ Смоленск",
    "разработка сайтов Смоленск",
    "заказать сайт Смоленск",
    "веб-студия Смоленск",
    "сайт под ключ",
    "заказать лендинг",
    "разработка интернет-магазина",
    "корпоративный сайт",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: "WebVector",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "WebVector — создание сайтов под ключ в Смоленске" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [OG_IMAGE] },
  robots: { index: true, follow: true },
  verification: YANDEX_VERIFICATION ? { yandex: YANDEX_VERIFICATION } : undefined,
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${SITE_URL}/#organization`,
  name: "WebVector",
  url: SITE_URL,
  description: DESCRIPTION,
  logo: { "@type": "ImageObject", url: LOGO_URL, width: 512, height: 512 },
  image: OG_IMAGE,
  address: { "@type": "PostalAddress", addressLocality: "Смоленск", addressRegion: "Смоленская область", addressCountry: "RU" },
  areaServed: REGIONS.map((name) => ({ "@type": "AdministrativeArea", name })),
  currenciesAccepted: "RUB",
  paymentAccepted: "Перевод на счёт, онлайн",
  openingHours: "Mo-Fr 09:00-18:00",
  priceRange: "от 30 000 ₽",
  email: EMAIL,
  telephone: PHONE,
  contactPoint: { "@type": "ContactPoint", contactType: "sales", email: EMAIL, telephone: PHONE, areaServed: "RU", availableLanguage: "Russian" },
  sameAs: [CONTACTS.telegram.href, CONTACTS.vk.href],
  aggregateRating: { "@type": "AggregateRating", ratingValue: AGGREGATE_RATING.value, reviewCount: AGGREGATE_RATING.count, bestRating: "5" },
  review: REVIEWS.map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.author },
    reviewRating: { "@type": "Rating", ratingValue: String(r.rating), bestRating: "5" },
    reviewBody: r.text,
  })),
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "WebVector",
  url: SITE_URL,
  inLanguage: "ru-RU",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${unbounded.variable} h-full scroll-smooth antialiased`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden bg-background text-foreground">
        {YANDEX_METRIKA_ID ? (
          <>
            <Script id="yandex-metrika" strategy="afterInteractive">
              {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${YANDEX_METRIKA_ID},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});`}
            </Script>
            <noscript><div><img src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`} style={{ position: "absolute", left: "-9999px" }} alt="" /></div></noscript>
          </>
        ) : null}
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
