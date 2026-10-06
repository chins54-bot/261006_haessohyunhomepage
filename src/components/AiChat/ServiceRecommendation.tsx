import type { ServiceKind } from "./types";

const SERVICES: Record<
  ServiceKind,
  { eyebrow: string; title: string; description: string; href: string; cta: string }
> = {
  consulting: {
    eyebrow: "PERSONAL CONSULTING",
    title: "1:1 재테크 컨설팅",
    description:
      "소득 · 자산 · 대출 · 주거 상황을 바탕으로 내 집 마련 방향을 함께 정리합니다.",
    href: "consulting.html",
    cta: "컨설팅 자세히 보기",
  },
  challenge: {
    eyebrow: "4-WEEK ACTION PROGRAM",
    title: "4주 내집마련 챌린지",
    description:
      "예산 설정부터 지역 선택, 단지 분석, 임장까지 직접 실행해봅니다.",
    href: "challenge.html",
    cta: "4주 챌린지 보기",
  },
  newsletter: {
    eyebrow: "FREE NEWSLETTER",
    title: "해쏘현 뉴스레터",
    description: "복잡한 재테크 정보를 쉽게 읽으며 나만의 기준을 쌓아보세요.",
    href: "#newsletter",
    cta: "무료 뉴스레터 보기",
  },
};

export function ServiceRecommendation({ service }: { service: ServiceKind }) {
  const item = SERVICES[service];
  return (
    <aside className="mt-3 border border-[#d7c9b8] bg-[#f6f1e8] p-4 text-left">
      <p className="m-0 text-[8px] font-semibold tracking-[0.16em] text-caramel">
        {item.eyebrow}
      </p>
      <h3 className="mb-2 mt-2 font-serif text-base font-normal text-espresso">
        {item.title}
      </h3>
      <p className="m-0 text-[11px] leading-[1.75] text-[#705e52]">
        {item.description}
      </p>
      <a
        href={item.href}
        className="mt-3 flex min-h-10 items-center justify-between border-t border-[#d7c9b8] pt-3 text-xs font-medium text-brown"
      >
        {item.cta} <span aria-hidden="true">↗</span>
      </a>
    </aside>
  );
}
