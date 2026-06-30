import { useState } from "react";
import { getGeminiResponse } from "../services/gemini";
import { typeText } from "../utils/typeText";

export default function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);

  const sendMessage = async (text) => {
    if (!text.trim() || loading || streaming) return;

    setLoading(true);

    const userMessage = {
      role: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const reply = await getGeminiResponse(text);

      // API response aa gaya
      setLoading(false);
      setStreaming(true);

      // Empty assistant message add karo
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "",
        },
      ]);

      // Character-by-character typing
      await typeText(reply, (currentText) => {
        setMessages((prev) => {
          const updated = [...prev];

          updated[updated.length - 1] = {
            role: "assistant",
            text: currentText,
          };

          return updated;
        });
      });

    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "❌ Something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
      setStreaming(false);
    }
  };

  return {
    messages,
    loading,
    streaming,
    sendMessage,
  };
}