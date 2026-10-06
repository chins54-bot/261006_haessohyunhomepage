type Props = {
  isOpen: boolean;
  onClick: () => void;
};

export function AiChatButton({ isOpen, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls="haessohyun-ai-panel"
      aria-label={isOpen ? "AI 상담원 닫기" : "해쏘현 AI 상담원 열기"}
      className={`fixed bottom-5 right-5 z-[70] min-h-14 items-center gap-3 rounded-full bg-espresso px-5 py-3 font-sans text-sm font-medium text-ivory shadow-editorial transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2 md:bottom-7 md:right-7 ${isOpen ? "hidden md:flex" : "flex"}`}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-sand/50 font-serif text-base">
        {isOpen ? "×" : "H"}
      </span>
      <span>{isOpen ? "닫기" : "AI 상담"}</span>
    </button>
  );
}
