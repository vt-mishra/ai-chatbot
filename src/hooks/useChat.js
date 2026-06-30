import { useState } from "react";
import { getGeminiResponse } from "../services/gemini";

export default function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;

    setLoading(true);

    const userMessage = {
      role: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const reply = await getGeminiResponse(text);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: reply,
        },
      ]);
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
    }
  };

  return {
    messages,
    loading,
    sendMessage,
  };
}