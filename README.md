# 해쏘현 브랜드 사이트

Vite 기반 React·TypeScript 사이트입니다. `npm install` 후 `npm run dev`로 개발 서버를 열고, `npm run build`로 `dist` 배포 결과물을 생성합니다.

- `index.html`: 브랜드 홈과 React AI 상담원 진입점
- `public/`: 기존 브랜드 사이트, 서비스 상세 페이지, 이미지 자산
- `src/components/AiChat/`: AI 상담원 UI 컴포넌트
- `src/services/gemini.ts`: Gemini 모델·시스템 지침·API 호출
- `src/hooks/`: API Key 저장과 대화 상태 관리

실제 신청 링크, 비용, 일정, 구독 서비스, 소셜 URL은 제공되지 않아 연동하지 않았습니다. 이메일은 전송·저장하지 않습니다. 활동 수치는 대시 placeholder입니다. 폰트는 jsDelivr를 사용하며 네트워크가 없으면 시스템 폰트로 표시됩니다.

AI 상담원은 사용자가 직접 입력한 Gemini API Key로 브라우저에서 Google API를 호출합니다. 키는 기본적으로 sessionStorage에 저장되며, 사용자가 ‘이 브라우저에 기억하기’를 선택한 경우에만 localStorage에 저장됩니다. 저장소나 빌드 파일에는 API Key가 포함되지 않습니다.

검증: JavaScript 문법, 내부 페이지 링크 및 앵커, 페이지별 단일 H1 확인. 브라우저 시각 검증과 온라인 배포는 미완료입니다. 

## Netlify 연결

GitHub 저장소의 `main` 브랜치를 연결하세요. Build command는 `npm run build`, Publish directory는 `dist`입니다. `netlify.toml`에도 같은 설정을 지정했습니다.

## Vercel 연결

GitHub 저장소를 그대로 연결하면 됩니다. `vercel.json`이 `npm run build`를 실행하고 `dist` 폴더를 배포 결과물로 지정합니다.
