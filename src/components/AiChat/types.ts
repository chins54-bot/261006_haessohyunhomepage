export type ServiceKind = "consulting" | "challenge" | "newsletter";

export type ChatMessageItem = {
  id: string;
  role: "user" | "assistant";
  text: string;
  service?: ServiceKind;
  isError?: boolean;
};

export const INITIAL_MESSAGE: ChatMessageItem = {
  id: "welcome",
  role: "assistant",
  text: `안녕하세요. 해쏘현 AI입니다 :)
내 집 마련이나 재테크에 대해 궁금한 점을 물어보세요.

예를 들어,
• 우리 부부 소득으로 얼마짜리 집을 살 수 있을까요?
• 전세와 매매 중 어떤 선택이 좋을까요?
• 내집마련 챌린지는 어떤 사람에게 맞나요?
• 1:1 컨설팅에서는 어떤 상담을 받을 수 있나요?`,
};
