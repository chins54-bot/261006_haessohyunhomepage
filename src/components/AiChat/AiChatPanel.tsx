import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useGeminiChat } from "../../hooks/useGeminiChat";
import { ApiKeySetup } from "./ApiKeySetup";
import { ChatMessage } from "./ChatMessage";
import { SuggestedQuestions } from "./SuggestedQuestions";

const DISCLAIMER =
  "해쏘현 AI의 답변은 일반적인 정보 제공을 목적으로 하며, 개인의 투자수익을 보장하거나 특정 금융상품의 매수·매도를 권유하지 않습니다. 대출·세금·청약 등 제도는 변경될 수 있으므로 실제 의사결정 전 최신 기준을 확인해주세요.";

type Props = {
  apiKey: string | null;
  onSaveApiKey: (apiKey: string, remember: boolean) => void;
  onDeleteApiKey: () => void;
  onClose: () => void;
};

export function AiChatPanel({
  apiKey,
  onSaveApiKey,
  onDeleteApiKey,
  onClose,
}: Props) {
  const [input, setInput] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { messages, isSending, sendMessage, resetConversation } =
    useGeminiChat(apiKey);
  const endRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, isSending]);

  useEffect(() => {
    function handleEscape(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  async function submitMessage(message: string) {
    if (!message.trim() || isSending) return;
    setInput("");
    await sendMessage(message);
    textareaRef.current?.focus();
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    void submitMessage(input);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void submitMessage(input);
    }
  }

  function handleReset() {
    resetConversation();
    setInput("");
    setIsSettingsOpen(false);
  }

  function handleKeyAction() {
    onDeleteApiKey();
    resetConversation();
    setIsSettingsOpen(false);
  }

  return (
    <section
      id="haessohyun-ai-panel"
      role="dialog"
      aria-modal="true"
      aria-label="해쏘현 AI 상담"
      className="fixed inset-0 z-[60] flex h-[100dvh] flex-col overflow-hidden bg-ivory font-sans text-espresso shadow-editorial md:inset-auto md:bottom-24 md:right-7 md:h-[min(720px,calc(100vh-125px))] md:w-[400px] md:border md:border-[#d4c9bb]"
    >
      <header className="relative flex min-h-[74px] shrink-0 items-center justify-between border-b border-[#ddd3c7] bg-ivory px-5">
        <div>
          <p className="m-0 text-[9px] font-semibold tracking-[0.2em] text-caramel">
            REALISTIC MONEY GUIDE
          </p>
          <h1 className="mb-0 mt-1 font-serif text-lg font-normal leading-none text-espresso">
            해쏘현 AI
          </h1>
        </div>
        <div className="flex items-center gap-1">
          {apiKey && (
            <>
              <button
                type="button"
                onClick={handleReset}
                className="flex h-10 w-10 items-center justify-center bg-transparent text-lg text-brown hover:bg-[#ece6dd]"
                aria-label="새 대화 시작"
                title="새 대화 시작"
              >
                ↻
              </button>
              <button
                type="button"
                onClick={() => setIsSettingsOpen((current) => !current)}
                aria-expanded={isSettingsOpen}
                className="flex h-10 w-10 items-center justify-center bg-transparent text-lg text-brown hover:bg-[#ece6dd]"
                aria-label="상담 설정"
              >
                ···
              </button>
            </>
          )}
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center bg-transparent text-2xl font-light text-brown hover:bg-[#ece6dd]"
            aria-label="채팅 닫기"
          >
            ×
          </button>
        </div>

        {apiKey && isSettingsOpen && (
          <div className="absolute right-12 top-[62px] z-20 w-44 border border-[#d4c9bb] bg-paper p-1.5 shadow-lg">
            <button
              type="button"
              onClick={handleReset}
              className="min-h-10 w-full bg-transparent px-3 text-left text-xs text-espresso hover:bg-[#eee8df]"
            >
              대화 초기화
            </button>
            <button
              type="button"
              onClick={handleKeyAction}
              className="min-h-10 w-full bg-transparent px-3 text-left text-xs text-espresso hover:bg-[#eee8df]"
            >
              API Key 변경
            </button>
            <button
              type="button"
              onClick={handleKeyAction}
              className="min-h-10 w-full bg-transparent px-3 text-left text-xs text-[#963b32] hover:bg-[#fff2ef]"
            >
              API Key 삭제
            </button>
          </div>
        )}
      </header>

      {!apiKey ? (
        <ApiKeySetup onConnected={onSaveApiKey} />
      ) : (
        <>
          <div
            className="min-h-0 flex-1 space-y-5 overflow-y-auto bg-[#f7f4ee] px-4 py-5"
            aria-live="polite"
          >
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {messages.length === 1 && (
              <SuggestedQuestions
                onSelect={(question) => void submitMessage(question)}
                disabled={isSending}
              />
            )}
            {isSending && (
              <div className="flex justify-start" aria-label="답변 작성 중">
                <div className="rounded-[4px_18px_18px_18px] border border-[#ded4c7] bg-white px-4 py-3">
                  <span className="ai-typing-dot" />
                  <span className="ai-typing-dot" />
                  <span className="ai-typing-dot" />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="shrink-0 border-t border-[#ddd3c7] bg-paper">
            <form onSubmit={handleSubmit} className="flex items-end gap-2 px-4 py-3">
              <label className="sr-only" htmlFor="haessohyun-ai-message">
                상담 내용 입력
              </label>
              <textarea
                ref={textareaRef}
                id="haessohyun-ai-message"
                rows={1}
                value={input}
                onChange={(event) => setInput(event.target.value.slice(0, 2000))}
                onKeyDown={handleKeyDown}
                placeholder="궁금한 내용을 입력해주세요"
                disabled={isSending}
                className="max-h-28 min-h-11 flex-1 resize-none rounded-none border-0 border-b border-[#cfc2b3] bg-transparent px-1 py-2.5 text-[13px] leading-5 text-espresso outline-none placeholder:text-[#9a8c80] focus:border-brown disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!input.trim() || isSending}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-espresso text-base text-ivory transition hover:bg-brown disabled:cursor-not-allowed disabled:opacity-35"
                aria-label="메시지 전송"
              >
                ↑
              </button>
            </form>
            <p className="m-0 border-t border-[#ebe4da] px-4 py-2.5 text-[8px] leading-[1.55] text-[#8d8177]">
              {DISCLAIMER}
            </p>
          </div>
        </>
      )}
    </section>
  );
}
