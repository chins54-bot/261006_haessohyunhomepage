import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AiChat } from "./components/AiChat/AiChat";
import "./ai-chat.css";

const root = document.getElementById("ai-chat-root");
if (root) {
  createRoot(root).render(
    <StrictMode>
      <AiChat />
    </StrictMode>,
  );
}
