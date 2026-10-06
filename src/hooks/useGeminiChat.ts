import { useCallback, useState } from "react";
import {
  getFriendlyGeminiError,
  sendGeminiMessage,
  type GeminiHistoryItem,
} from "../services/gemini";
import {
  INITIAL_MESSAGE,
  type ChatMessageItem,
  type ServiceKind,
} from "../components/AiChat/types";

const SERVICE_PATTERN = /\[\[SERVICE:(consulting|challenge|newsletter)\]\]/g;

function makeId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
}

function parseResponse(text: string) {
  const service = text.match(SERVICE_PATTERN)?.[0]
    ?.replace("[[SERVICE:", "")
    .replace("]]", "") as ServiceKind | undefined;
  return {
    text: text.replace(SERVICE_PATTERN, "").trim(),
    service,
  };
}

function toHistory(messages: ChatMessageItem[]): GeminiHistoryItem[] {
  return messages
    .filter((item) => item.id !== "welcome" && !item.isError)
    .map((item) => ({
      role: item.role === "assistant" ? "model" : "user",
      text: item.text,
    }));
}

export function useGeminiChat(apiKey: string | null) {
  const [messages, setMessages] = useState<ChatMessageItem[]>([INITIAL_MESSAGE]);
  const [isSending, setIsSending] = useState(false);

  const sendMessage = useCallback(
    async (rawMessage: string) => {
      const message = rawMessage.trim();
      if (!message || !apiKey || isSending) return;

      const userMessage: ChatMessageItem = {
        id: makeId(),
        role: "user",
        text: message,
      };
      const history = toHistory(messages);
      setMessages((current) => [...current, userMessage]);
      setIsSending(true);

      try {
        const response = await sendGeminiMessage(apiKey, history, message);
        const parsed = parseResponse(response);
        setMessages((current) => [
          ...current,
          {
            id: makeId(),
            role: "assistant",
            text: parsed.text,
            service: parsed.service,
          },
        ]);
      } catch (error) {
        setMessages((current) => [
          ...current,
          {
            id: makeId(),
            role: "assistant",
            text: getFriendlyGeminiError(error),
            isError: true,
          },
        ]);
      } finally {
        setIsSending(false);
      }
    },
    [apiKey, isSending, messages],
  );

  const resetConversation = useCallback(() => {
    if (!isSending) setMessages([INITIAL_MESSAGE]);
  }, [isSending]);

  return { messages, isSending, sendMessage, resetConversation };
}
