"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NAV_ITEMS, CONTACTS } from "@/lib/content";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <>
      <button
        aria-label={open ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
      >
        <span
          className={`h-px w-6 bg-foreground transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
        />
        <span
          className={`h-px w-6 bg-foreground transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
        />
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full border-t border-border-soft bg-background px-6 py-6 md:hidden"
        >
          <nav className="flex flex-col gap-5">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-2 text-sm font-semibold tracking-[0.18em] uppercase"
              >
                {item.label}
                <span className="text-[10px] text-accent/80">{item.num}</span>
              </Link>
            ))}
            <a
              href={CONTACTS.phone.href}
              className="text-sm font-semibold tracking-[0.18em] text-muted uppercase"
            >
              {CONTACTS.phone.label}
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
