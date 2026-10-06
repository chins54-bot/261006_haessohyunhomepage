import { useCallback, useState } from "react";

const SESSION_KEY = "haessohyun-gemini-key";
const LOCAL_KEY = "haessohyun-gemini-key-remembered";

function readInitialKey() {
  return sessionStorage.getItem(SESSION_KEY) ?? localStorage.getItem(LOCAL_KEY);
}

export function useApiKey() {
  const [apiKey, setApiKeyState] = useState<string | null>(readInitialKey);

  const saveApiKey = useCallback((value: string, remember: boolean) => {
    const key = value.trim();
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(LOCAL_KEY);
    if (remember) localStorage.setItem(LOCAL_KEY, key);
    else sessionStorage.setItem(SESSION_KEY, key);
    setApiKeyState(key);
  }, []);

  const deleteApiKey = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(LOCAL_KEY);
    setApiKeyState(null);
  }, []);

  return { apiKey, saveApiKey, deleteApiKey };
}
