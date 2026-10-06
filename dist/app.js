const menu = document.querySelector(".menu");
const nav = document.querySelector("#nav");
menu?.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("open", open);
});
nav?.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    menu.setAttribute("aria-expanded", "false");
    nav.classList.remove("open");
  }),
);
document.querySelector("#newsletter-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  document.querySelector("#form-status").textContent =
    "현재 구독 서비스 연결을 준비하고 있습니다. 이메일은 전송되거나 저장되지 않았습니다.";
});
