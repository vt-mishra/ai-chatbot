import { useEffect, useMemo, useState } from "react";
import { getGeminiResponse } from "../services/gemini";
import { typeText } from "../utils/typeText";
import {
  loadConversations,
  saveConversations,
} from "../utils/storage";

export default function useChat() {
const [conversations, setConversations] = useState(() => {
  const data = loadConversations();

  if (data.length > 0) {
    return data;
  }

  return [
    {
      id: crypto.randomUUID(),
      title: "New Chat",
      messages: [],
    },
  ];
});

const [currentChatId, setCurrentChatId] = useState(
  () => conversations[0].id
);
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);

  useEffect(() => {
    saveConversations(conversations);
  }, [conversations]);

  useEffect(() => {
  const exists = conversations.some(
    (chat) => chat.id === currentChatId
  );

  if (!exists && conversations.length > 0) {
    setCurrentChatId(conversations[0].id);
  }
}, [conversations, currentChatId]);

  const currentConversation = useMemo(() => {
    return conversations.find(
      (chat) => chat.id === currentChatId
    );
  }, [conversations, currentChatId]);

  const messages = currentConversation?.messages ?? [];

  const newChat = () => {
    const chat = {
      id: crypto.randomUUID(),
      title: "New Chat",
      messages: [],
    };

    setConversations((prev) => [chat, ...prev]);
    setCurrentChatId(chat.id);
  };

  const selectChat = (id) => {
    setCurrentChatId(id);
  };

  const createChatTitle = (text) => {
  const cleaned = text.trim().replace(/\s+/g, " ");

  return cleaned.length > 30
    ? cleaned.slice(0, 30) + "..."
    : cleaned;
};

  const sendMessage = async (text) => {
    if (!text.trim() || loading || streaming) return;

    setLoading(true);

const userMessage = {
  id: crypto.randomUUID(),
  role: "user",
  text,
};

    // User message add
    setConversations((prev) =>
      prev.map((chat) => {
        if (chat.id !== currentChatId) return chat;

        return {
          ...chat,
        title:
  chat.messages.length === 0
    ? createChatTitle(text)
    : chat.title,
          messages: [...chat.messages, userMessage],
        };
      })
    );

    try {
      const reply = await getGeminiResponse(text);

      setLoading(false);
      setStreaming(true);

      // Empty assistant message
      setConversations((prev) =>
        prev.map((chat) => {
          if (chat.id !== currentChatId) return chat;

          return {
            ...chat,
            messages: [
              ...chat.messages,
          {
  id: crypto.randomUUID(),
  role: "assistant",
  text: "",
},
            ],
          };
        })
      );

      // Streaming
      await typeText(reply, (currentText) => {
        setConversations((prev) =>
          prev.map((chat) => {
            if (chat.id !== currentChatId) return chat;

            const updatedMessages = [...chat.messages];

            updatedMessages[updatedMessages.length - 1] = {
              role: "assistant",
              text: currentText,
            };

            return {
              ...chat,
              messages: updatedMessages,
            };
          })
        );
      });

    } catch (error) {
      console.error(error);

      setConversations((prev) =>
        prev.map((chat) => {
          if (chat.id !== currentChatId) return chat;

          return {
            ...chat,
            messages: [
              ...chat.messages,
{
  id: crypto.randomUUID(),
  role: "assistant",
  text: "❌ Something went wrong.",
},
            ],
          };
        })
      );
    } finally {
      setLoading(false);
      setStreaming(false);
    }
  };

  return {
    conversations,
    currentChatId,
    messages,
    loading,
    streaming,
    sendMessage,
    newChat,
    selectChat,
  };
}