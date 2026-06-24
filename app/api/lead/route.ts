import { NextResponse } from "next/server";
import { sendLead } from "@/lib/leads";

// Тонкий роут: проверяет данные и зовёт сервис. Бизнес-логика — в lib/leads.ts.
export async function POST(req: Request) {
  console.log("[api/lead] start");
  try {
    const body = await req.json();
    const name = String(body?.name ?? "").trim();
    const contact = String(body?.contact ?? "").trim();
    const message = String(body?.message ?? "").trim();

    if (!name || !contact) {
      console.log("[api/lead] validation failed");
      return NextResponse.json(
        { error: "Заполните имя и контакт" },
        { status: 400 },
      );
    }

    await sendLead({ name, contact, message });

    console.log("[api/lead] success");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/lead] error", err);
    return NextResponse.json(
      { error: "Не удалось отправить заявку. Напишите нам в Telegram." },
      { status: 500 },
    );
  }
}
