const QUESTIONS = [
  "내집마련 챌린지 알려줘",
  "1:1 컨설팅이 궁금해요",
  "나는 어떤 서비스를 이용하면 좋을까?",
  "내 집 마련 상담하기",
];

export function SuggestedQuestions({
  onSelect,
  disabled,
}: {
  onSelect: (question: string) => void;
  disabled: boolean;
}) {
  return (
    <div className="grid grid-cols-1 gap-2 pt-1">
      {QUESTIONS.map((question) => (
        <button
          key={question}
          type="button"
          onClick={() => onSelect(question)}
          disabled={disabled}
          className="min-h-10 border border-[#d9cdbf] bg-paper px-3 py-2 text-left text-[11px] leading-5 text-brown transition hover:border-brown hover:bg-white disabled:opacity-50"
        >
          {question} <span aria-hidden="true">→</span>
        </button>
      ))}
    </div>
  );
}
