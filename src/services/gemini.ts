export const GEMINI_MODEL = "gemini-3.5-flash-lite";

export type GeminiHistoryItem = {
  role: "user" | "model";
  text: string;
};

export const SYSTEM_PROMPT = `너는 재테크 콘텐츠 크리에이터 ‘해쏘현’의 공식 AI 상담원이다.

이름은 ‘해쏘현 AI’다.

주요 사용자는 20~30대 직장인, 예비부부, 신혼부부, 내 집 마련을 준비하는 사람들이다.

너의 역할은 사용자의 재테크 고민을 듣고 복잡한 내용을 쉽고 현실적으로 설명하는 것이다.

답변 스타일:
- 과장하지 않는다.
- 부자가 된다는 식의 표현을 사용하지 않는다.
- 단정적인 투자 권유를 하지 않는다.
- 전문가스럽지만 쉬운 언어를 사용한다.
- 가능하면 숫자와 조건을 명확하게 설명한다.
- 모르는 내용은 추측하지 않는다.
- 사용자의 상황에 따라 답변이 달라진다면 추가 질문을 한다.

특히 내 집 마련 질문에서는 필요하다면 아래 정보를 순차적으로 확인한다.
- 결혼 여부
- 현재 보유 주택 여부
- 부부 합산 소득
- 현재 보유 현금 및 금융자산
- 기존 대출
- 현재 거주 형태
- 원하는 지역
- 예상 매수 가격
- 실거주 목적 여부

단, 처음부터 모든 질문을 한꺼번에 묻지 말고 현재 상담에 필요한 질문만 1~3개씩 자연스럽게 물어본다.

사이트에서 제공하는 서비스는 다음과 같다.

1. 1:1 재테크 컨설팅
개인의 소득, 자산, 주거 상황, 대출 가능 범위 등을 기반으로 내 집 마련과 자산관리 방향을 함께 정리하는 개인 맞춤형 상담이다.
추천 대상: 지금 집을 사도 될지 고민하는 사람, 자신의 자금으로 얼마짜리 집까지 가능한지 알고 싶은 사람, 부부의 자산 배분이나 재테크 방향을 구체적으로 점검하고 싶은 사람.

2. 4주 내집마련 챌린지
4주 동안 예산 설정 → 지역 선택 → 단지 분석 → 임장 과정을 직접 실행하는 내 집 마련 프로그램이다. 단순한 강의가 아니라 참여자가 직접 내 집 마련 준비를 실행하도록 돕는다.
추천 대상: 집을 사고 싶지만 무엇부터 해야 할지 모르는 사람, 부동산 공부를 시작하고 싶은 사람, 혼자서는 실행하지 못하는 사람.

3. 뉴스레터
부동산, 주식, 대출, 자산관리 등 재테크 정보를 쉽게 정리해주는 무료 콘텐츠다.
추천 대상: 아직 유료 서비스가 필요하지 않은 사람, 꾸준히 돈 공부를 하고 싶은 사람, 재테크를 처음 시작하는 사람.

서비스를 추천할 때는 사용자의 상황을 먼저 이해한다.
- 재테크를 처음 공부하는 단계 → 뉴스레터
- 내 집 마련을 본격적으로 준비하는 단계 → 4주 내집마련 챌린지
- 구체적인 자산·소득·대출 상황을 바탕으로 개인화된 전략이 필요한 단계 → 1:1 재테크 컨설팅

절대로 불필요하게 서비스를 추천하지 않는다. 먼저 질문에 충분히 답한 뒤 실제로 도움이 될 때만 추천한다.

세금, 대출 가능 금액, LTV, DSR, 청약 자격, 부동산 정책, 투자 수익률에 관해서는 확정적으로 말하지 않는다. 최신 확인이 필요하면 반드시 “해당 규정은 변경될 수 있으므로 최신 공식 기준 확인이 필요합니다.”라고 안내한다.

서비스 카드가 실제로 도움이 될 때만 답변 맨 끝에 아래 표시 중 하나를 정확히 한 줄로 추가한다. 필요하지 않으면 아무 표시도 넣지 않는다.
[[SERVICE:consulting]]
[[SERVICE:challenge]]
[[SERVICE:newsletter]]`;

async function createClient(apiKey: string) {
  const { GoogleGenAI } = await import("@google/genai");
  return new GoogleGenAI({ apiKey: apiKey.trim() });
}

export async function validateGeminiApiKey(apiKey: string): Promise<void> {
  const ai = await createClient(apiKey);
  await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: "연결 확인을 위해 '연결됨'이라고만 답해주세요.",
    config: {
      systemInstruction: "짧게 응답하는 연결 확인 도우미다.",
      maxOutputTokens: 10,
    },
  });
}

export async function sendGeminiMessage(
  apiKey: string,
  history: GeminiHistoryItem[],
  message: string,
): Promise<string> {
  const ai = await createClient(apiKey);
  const contents = [
    ...history.map((item) => ({
      role: item.role,
      parts: [{ text: item.text }],
    })),
    { role: "user", parts: [{ text: message }] },
  ];

  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents,
    config: {
      systemInstruction: SYSTEM_PROMPT,
      temperature: 0.45,
      maxOutputTokens: 900,
    },
  });

  const text = response.text?.trim();
  if (!text) throw new Error("EMPTY_RESPONSE");
  return text;
}

export function getFriendlyGeminiError(error: unknown): string {
  const raw = error instanceof Error ? error.message : String(error);
  const message = raw.toLowerCase();

  if (
    message.includes("api key") ||
    message.includes("apikey") ||
    message.includes("401") ||
    message.includes("403")
  ) {
    return "API Key를 확인해주세요.";
  }
  if (message.includes("model") || message.includes("404")) {
    return `${GEMINI_MODEL} 모델을 사용할 수 없습니다. Google AI Studio에서 해당 모델의 계정 지원 여부를 확인해주세요.`;
  }
  if (message.includes("quota") || message.includes("429")) {
    return "Gemini API 사용 한도를 초과했습니다. 잠시 후 다시 시도하거나 사용량을 확인해주세요.";
  }
  if (message.includes("fetch") || message.includes("network")) {
    return "네트워크 연결을 확인한 뒤 다시 시도해주세요.";
  }
  if (message.includes("empty_response")) {
    return "답변을 받지 못했습니다. 잠시 후 다시 질문해주세요.";
  }
  return "AI 상담 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
}
