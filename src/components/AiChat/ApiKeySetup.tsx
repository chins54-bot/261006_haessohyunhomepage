import { FormEvent, useState } from "react";
import {
  getFriendlyGeminiError,
  validateGeminiApiKey,
} from "../../services/gemini";

type Props = {
  onConnected: (apiKey: string, remember: boolean) => void;
};

export function ApiKeySetup({ onConnected }: Props) {
  const [apiKey, setApiKey] = useState("");
  const [remember, setRemember] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!apiKey.trim() || isChecking) return;
    setError("");
    setIsChecking(true);
    try {
      await validateGeminiApiKey(apiKey);
      onConnected(apiKey, remember);
    } catch (validationError) {
      setError(getFriendlyGeminiError(validationError));
    } finally {
      setIsChecking(false);
    }
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 py-7">
      <p className="mb-3 text-[10px] font-semibold tracking-[0.2em] text-brown">
        PRIVATE API CONNECTION
      </p>
      <h2 className="m-0 font-serif text-[26px] font-normal leading-[1.45] text-espresso">
        AI 재테크 상담원<br />시작하기
      </h2>
      <p className="mb-6 mt-4 text-[13px] leading-6 text-[#705e52]">
        AI 상담 기능을 이용하려면 Google Gemini API Key가 필요합니다.
        입력한 API Key는 이 브라우저에서만 사용되며 서버에 저장하지 않습니다.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-2 block text-xs font-medium text-espresso">
            Gemini API Key
          </span>
          <input
            type="password"
            value={apiKey}
            onChange={(event) => setApiKey(event.target.value)}
            placeholder="AIza..."
            autoComplete="off"
            spellCheck={false}
            className="h-12 w-full rounded-none border border-[#d4c9bb] bg-white/70 px-3 font-mono text-sm text-espresso outline-none transition placeholder:text-[#a99c90] focus:border-brown focus:ring-1 focus:ring-brown"
          />
        </label>

        <label className="flex cursor-pointer items-start gap-2 text-[11px] leading-5 text-[#705e52]">
          <input
            type="checkbox"
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
            className="mt-0.5 h-4 w-4 accent-brown"
          />
          <span>
            이 브라우저에 기억하기
            <small className="block text-[10px] text-[#94877c]">
              체크한 경우에만 localStorage에 저장됩니다.
            </small>
          </span>
        </label>

        {error && (
          <p role="alert" className="m-0 text-xs leading-5 text-[#9b342c]">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={!apiKey.trim() || isChecking}
          className="flex min-h-12 w-full items-center justify-center bg-espresso px-4 text-sm font-medium text-ivory transition hover:bg-brown disabled:cursor-not-allowed disabled:opacity-45"
        >
          {isChecking ? "연결 확인 중…" : "API Key 연결하기"}
        </button>
      </form>

      <a
        href="https://aistudio.google.com/app/apikey"
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex w-fit items-center gap-2 border-b border-brown/40 pb-0.5 text-xs text-brown hover:border-brown"
      >
        Gemini API Key 발급 방법 <span aria-hidden="true">↗</span>
      </a>
      <p className="mt-auto pt-7 text-[10px] leading-[1.65] text-[#94877c]">
        API Key는 Google Gemini API 호출에만 사용됩니다. 공용 기기에서는
        ‘이 브라우저에 기억하기’를 선택하지 마세요.
      </p>
    </div>
  );
}
