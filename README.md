# 해쏘현 브랜드 사이트

`dist/index.html`을 브라우저에서 열거나 `dist`를 정적 호스팅에 배포하세요.

- index.html: 브랜드 홈, 서비스 선택, 소개, 뉴스레터 폼
- consulting.html: 1:1 재테크 컨설팅 상세
- challenge.html: 4주 내집마련 챌린지 상세
- style.css: 반응형 스타일
- app.js: 모바일 메뉴와 뉴스레터 준비 안내

실제 신청 링크, 비용, 일정, 구독 서비스, 소셜 URL은 제공되지 않아 연동하지 않았습니다. 이메일은 전송·저장하지 않습니다. 활동 수치는 대시 placeholder입니다. 폰트는 jsDelivr를 사용하며 네트워크가 없으면 시스템 폰트로 표시됩니다.

검증: JavaScript 문법, 내부 페이지 링크 및 앵커, 페이지별 단일 H1 확인. 브라우저 시각 검증과 온라인 배포는 미완료입니다. 

## Netlify 연결

GitHub 저장소의 `main` 브랜치를 연결하세요. 빌드 명령은 비워두고 Publish directory는 `dist`로 설정합니다. `netlify.toml`에도 게시 폴더를 지정했습니다. GitHub Pages 자동 배포는 사용하지 않습니다.

## Vercel 연결

GitHub 저장소를 그대로 연결하면 됩니다. 빌드 명령은 필요하지 않으며, `vercel.json`이 정적 사이트가 있는 `dist` 폴더를 배포 결과물로 지정합니다.
