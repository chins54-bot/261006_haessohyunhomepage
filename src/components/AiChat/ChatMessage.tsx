import { ServiceRecommendation } from "./ServiceRecommendation";
import type { ChatMessageItem } from "./types";

export function ChatMessage({ message }: { message: ChatMessageItem }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className="max-w-[88%]">
        {!isUser && (
          <p className="mb-1.5 mt-0 text-[9px] font-semibold tracking-[0.14em] text-brown">
            HAESSOHYUN AI
          </p>
        )}
        <div
          className={`whitespace-pre-wrap px-4 py-3 text-[13px] leading-[1.75] ${
            isUser
              ? "rounded-[18px_18px_4px_18px] bg-espresso text-ivory"
              : message.isError
                ? "rounded-[4px_18px_18px_18px] border border-[#d9aaa4] bg-[#fff7f5] text-[#8a3028]"
                : "rounded-[4px_18px_18px_18px] border border-[#ded4c7] bg-white text-[#4f3c31]"
          }`}
        >
          {message.text}
        </div>
        {message.service && <ServiceRecommendation service={message.service} />}
      </div>
    </div>
  );
}
