"use client";

import { useState, type FormEvent } from "react";
import { CONTACTS } from "@/lib/content";
import Reveal from "./Reveal";
import ParallaxBlob from "./ParallaxBlob";

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSending(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      contact: String(data.get("contact") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Не удалось отправить заявку");
      }
      setSent(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Не удалось отправить заявку",
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <section
      id="contacts"
      className="relative scroll-mt-24 overflow-hidden border-t border-border-soft px-6 py-24 md:px-12 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <ParallaxBlob
          factor={0.05}
          className="absolute right-[-10rem] bottom-[-10rem] h-[28rem] w-[28rem] rounded-full border border-border-soft"
        />
      </div>

      <Reveal>
        <h2 className="font-display text-[clamp(2.2rem,6vw,4rem)] leading-none uppercase">
          Готовы начать
          <br />
          проект?
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-20">
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted">
            Напишите нам напрямую — ответим в течение рабочего дня
          </p>
          <div className="flex flex-col gap-3">
            {[CONTACTS.telegram, CONTACTS.vk, CONTACTS.email].map(
              (contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  className="group flex w-fit items-center gap-3 border-b border-border-soft pb-2 text-lg font-semibold uppercase transition-colors hover:text-accent"
                >
                  {contact.label}
                  <span className="text-accent transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </a>
              ),
            )}
            <a
              href={CONTACTS.phone.href}
              className="w-fit border-b border-border-soft pb-2 text-lg font-semibold hover:text-accent"
            >
              {CONTACTS.phone.label}
            </a>
          </div>
        </div>

        {sent ? (
          <div
            role="status"
            className="flex flex-col justify-center gap-3 rounded-2xl border border-accent/40 bg-accent/[0.04] p-8"
          >
            <span className="font-display text-xl uppercase">
              Заявка отправлена
            </span>
            <p className="text-sm leading-relaxed text-muted">
              Спасибо! Мы свяжемся с вами в течение рабочего дня. Если вопрос
              срочный — напишите нам в Telegram.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              required
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Имя"
              className="border-b border-border-soft bg-transparent py-3 text-sm outline-none placeholder:text-muted focus:border-accent"
            />
            <input
              required
              type="text"
              name="contact"
              placeholder="Telegram или телефон"
              className="border-b border-border-soft bg-transparent py-3 text-sm outline-none placeholder:text-muted focus:border-accent"
            />
            <textarea
              name="message"
              placeholder="Расскажите о проекте"
              rows={3}
              className="border-b border-border-soft bg-transparent py-3 text-sm outline-none placeholder:text-muted focus:border-accent"
            />
            {error && (
              <p role="alert" className="text-sm text-accent">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={sending}
              className="mt-2 flex w-fit items-center gap-3 rounded-full border border-accent/70 px-7 py-4 text-xs font-semibold tracking-[0.18em] uppercase transition-colors hover:bg-accent hover:text-background disabled:cursor-not-allowed disabled:opacity-50"
            >
              {sending ? "Отправляем…" : "Отправить заявку"}
              <span>↗</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
