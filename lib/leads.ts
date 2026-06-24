// Отправка заявки с сайта в Telegram. Вызывается только из API-роута
// (серверный код) — токен бота никогда не попадает в браузер.

export type Lead = {
  name: string;
  contact: string;
  message?: string;
};

export async function sendLead(lead: Lead): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  // Если токены не вписаны в .env.local — честно сообщаем об этом в лог,
  // чтобы не делать вид, что заявка ушла.
  if (!token || !chatId) {
    throw new Error(
      "Telegram не настроен: добавь TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID в .env.local",
    );
  }

  const text = [
    "🟡 Новая заявка с сайта WebVector",
    "",
    `Имя: ${lead.name}`,
    `Контакт: ${lead.contact}`,
    `Сообщение: ${lead.message?.trim() || "—"}`,
  ].join("\n");

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Telegram API error ${res.status}: ${detail}`);
  }
}
