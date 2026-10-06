import { useState } from "react";
import { useApiKey } from "../../hooks/useApiKey";
import { AiChatButton } from "./AiChatButton";
import { AiChatPanel } from "./AiChatPanel";

export function AiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const { apiKey, saveApiKey, deleteApiKey } = useApiKey();

  return (
    <>
      {isOpen && (
        <AiChatPanel
          apiKey={apiKey}
          onSaveApiKey={saveApiKey}
          onDeleteApiKey={deleteApiKey}
          onClose={() => setIsOpen(false)}
        />
      )}
      <AiChatButton isOpen={isOpen} onClick={() => setIsOpen((value) => !value)} />
    </>
  );
}
