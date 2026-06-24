// Header теперь серверный — логотип рендерится сразу без JS
// Мобильное меню вынесено в отдельный клиентский компонент

import Link from "next/link";
import { BRAND, CONTACTS, NAV_ITEMS } from "@/lib/content";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-soft bg-background/80 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-6 md:px-12">
        {/* LCP элемент — рендерится мгновенно на сервере */}
        <Link
          href="/"
          className="font-display text-xl tracking-tight text-foreground"
        >
          {BRAND}
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group flex items-baseline gap-1 text-xs font-semibold tracking-[0.18em] text-foreground/90 uppercase transition-colors hover:text-accent"
            >
              {item.label}
              <span className="text-[10px] text-accent/80 group-hover:text-accent">
                {item.num}
              </span>
            </Link>
          ))}
        </nav>

        <a
          href={CONTACTS.phone.href}
          className="hidden text-xs font-semibold tracking-[0.18em] text-foreground/90 uppercase hover:text-accent md:block"
        >
          {CONTACTS.phone.label}
        </a>

        {/* Только кнопка бургера клиентская */}
        <MobileMenu />
      </div>
    </header>
  );
}
