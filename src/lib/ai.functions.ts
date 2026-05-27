import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const MessageSchema = z.object({
  role: z.enum(["system", "user", "assistant"]),
  content: z.string(),
});

const ChatInput = z.object({
  messages: z.array(MessageSchema).min(1).max(50),
  system: z.string().max(4000).optional(),
});

export const aiChat = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => ChatInput.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY not configured");

    const messages = data.system
      ? [{ role: "system" as const, content: data.system }, ...data.messages]
      : data.messages;

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages,
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      if (resp.status === 429) throw new Error("Rate limit reached. Please try again in a moment.");
      if (resp.status === 402) throw new Error("AI credits exhausted. Add funds in Settings → Workspace → Usage.");
      throw new Error(`AI error (${resp.status}): ${text.slice(0, 200)}`);
    }

    const json = await resp.json();
    const content: string = json.choices?.[0]?.message?.content ?? "";
    return { content };
  });
