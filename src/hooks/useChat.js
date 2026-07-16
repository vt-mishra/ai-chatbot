import { useEffect, useMemo,useRef,useState } from "react";
import {
  getGeminiResponse,
  generateChatTitle,
} from "../services/gemini";
import { typeText } from "../utils/typeText";
import {
  loadConversations,
  saveConversations,
} from "../utils/storage";
import { fileToBase64 } from "../utils/fileToBase64";
import { generateImage } from "../services/imageGeneration";
import { extractFileText } from "../utils/extractFileText";
import { speak, stopSpeaking } from "../utils/speech";
import toast from "react-hot-toast";
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

  const [currentChatId, setCurrentChatId] = useState(() => {
    const data = loadConversations();

    if (data.length > 0) {
      return data[0].id;
    }

    return crypto.randomUUID();
  });

  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState(null);
const [editingText, setEditingText] = useState("");
const abortControllerRef = useRef(null);
const stopGenerationRef = useRef(false);
const [voiceEnabled, setVoiceEnabled] = useState(true);

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

  useEffect(() => {
  const handleOffline = () => {
    toast.error("📡 No internet connection.");
  };

  const handleOnline = () => {
    toast.success("✅ Back online.");
  };

  window.addEventListener("offline", handleOffline);
  window.addEventListener("online", handleOnline);

  return () => {
    window.removeEventListener("offline", handleOffline);
    window.removeEventListener("online", handleOnline);
  };
}, []);

  useEffect(() => {
  if (!voiceEnabled) {
    stopSpeaking();
  }
}, [voiceEnabled]);
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
  pinned: false,
};

    setConversations((prev) => [chat, ...prev]);
    setCurrentChatId(chat.id);
  };

  const deleteChat = (id) => {
    setConversations((prev) => {
      const updated = prev.filter(
        (chat) => chat.id !== id
      );

      if (updated.length === 0) {
        const newConversation = {
          id: crypto.randomUUID(),
          title: "New Chat",
          messages: [],
        };

        setCurrentChatId(newConversation.id);
        return [newConversation];
      }

      if (id === currentChatId) {
        setCurrentChatId(updated[0].id);
      }

      return updated;
    });
  };

const renameChat = (id, title) => {
  const newTitle = title.trim();

  if (!newTitle) return;

  setConversations((prev) =>
    prev.map((chat) =>
      chat.id === id
        ? {
            ...chat,
            title: newTitle,
          }
        : chat
    )
  );
  toast.success("Chat renamed");
};

const togglePin = (id) => {
  setConversations((prev) =>
    prev.map((chat) =>
      chat.id === id
        ? {
            ...chat,
            pinned: !chat.pinned,
          }
        : chat
    )
  );
};
  const selectChat = (id) => {
    setCurrentChatId(id);
  };

  const startEditingMessage = (messageId) => {
  const message = messages.find(
    (msg) => msg.id === messageId
  );

  if (!message) return;

  setEditingMessageId(messageId);
  setEditingText(message.text);
};

const cancelEditing = () => {
    setEditingMessageId(null);
  setEditingText("");
};

const stopGeneration = () => {
  stopGenerationRef.current = true;

  if (abortControllerRef.current) {
    abortControllerRef.current.abort();
  }
    stopSpeaking();
};

  const createChatTitle = (text) => {
    const cleaned = text.trim().replace(/\s+/g, " ");

    return cleaned.length > 30
      ? cleaned.slice(0, 30) + "..."
      : cleaned;
  };


  const sendMessage = async (text,image,file,mode = "chat") => {
    let prompt = text.trim();
  stopSpeaking();
if (!prompt && file) {
  prompt = "Summarize this document.";
}
   if (
  (!text.trim() && !image && !file) ||
  loading ||
  streaming
)
  return;

    const chatId = currentChatId;
if (!navigator.onLine) {
  toast.error("📡 No internet connection. Reconnect and try again.");
  return;
}
    setLoading(true);

   let imageData = null;

if (image) {
  imageData = await fileToBase64(image);
}
let fileData = null;

if (file) {
    fileData = await fileToBase64(file);
}
const userMessage = {
    id: crypto.randomUUID(),
    role: "user",
    text:prompt,
    image: imageData,
    imageType: image?.type,
    file: fileData,
    fileType: file?.type,
    fileName: file?.name,
    mode,
};

    setConversations((prev) =>
      
      prev.map((chat) => {
        if (chat.id !== chatId) return chat;

        return {
          ...chat,
          title:
  chat.messages.length === 0
    ? createChatTitle(text || file?.name || "New Chat")
    : chat.title,
          messages: [...chat.messages, userMessage],
        };
      })
    );

    // First message hai to AI title background me generate karo
const isFirstMessage =
  currentConversation?.messages.length === 0;

if (isFirstMessage) {
const title = generateChatTitle(prompt);

setConversations((prev) =>
  prev.map((chat) =>
    chat.id === chatId
      ? {
          ...chat,
          title: title || createChatTitle(prompt),
        }
      : chat
  )
);
}

    try {
      let fileText = "";

if (file) {
    fileText = await extractFileText(file);
}

const history = [
  ...currentConversation.messages.slice(-20),
  {
    ...userMessage,
    text:
      fileText.length > 0
        ? `User Prompt:

${prompt}

Attached document:

${fileText}`
        : prompt,
  },
];

abortControllerRef.current = new AbortController();

if (mode === "image") {
  const image = await generateImage(text);
  const assistantMessage = {
    id: crypto.randomUUID(),
    role: "assistant",
    type: "image",
    image,
    prompt: text,
  };

  setLoading(false);

  setConversations((prev) =>
    prev.map((chat) =>
      chat.id === chatId
        ? {
            ...chat,
            messages: [...chat.messages, assistantMessage],
          }
        : chat
    )
  );

  return;
}

const reply = await getGeminiResponse(
  history,
  abortControllerRef.current.signal
);

if (reply === "__QUOTA_EXCEEDED__") {
  toast.error(
    "Daily Gemini quota reached. Please try again tomorrow or add your own API key in Settings."
  );
  return;
}

if (reply === "__INVALID_API_KEY__") {
  toast.error(
    "Invalid Gemini API key. Please update it in Settings."
  );
  return;
}
      const assistantMessageId = crypto.randomUUID();

      setLoading(false);
      stopGenerationRef.current = false;
      setStreaming(true);

      setConversations((prev) =>
        prev.map((chat) => {
          if (chat.id !== chatId) return chat;

          return {
            ...chat,
            messages: [
              ...chat.messages,
              {
                id: assistantMessageId,
                role: "assistant",
                text: "",
              },
            ],
          };
        })
      );

   await typeText(
  reply,
  (currentText) => {
    setConversations((prev) =>
      prev.map((chat) => {
        if (chat.id !== chatId) return chat;

        const updatedMessages = chat.messages.map((message) =>
          message.id === assistantMessageId
            ? {
                ...message,
                text: currentText,
              }
            : message
        );

        return {
          ...chat,
          messages: updatedMessages,
        };
      })
    );
  },
  () => stopGenerationRef.current
);

if (voiceEnabled && reply.trim()) {
  stopSpeaking();

  setTimeout(() => {
    speak(reply);
  }, 150);
}
          } catch (error) {
             if (error.name === "AbortError") {
    return;
  }
      console.error(error);

      setConversations((prev) =>
        prev.map((chat) => {
          if (chat.id !== chatId) return chat;

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
       abortControllerRef.current = null;
    }
  };

  const regenerateResponse = async (assistantMessageId) => {
    if (loading || streaming) return;

    const chatId = currentChatId;

    const current = conversations.find(
      (chat) => chat.id === chatId
    );

    if (!current) return;

    const assistantIndex = current.messages.findIndex(
      (message) => message.id === assistantMessageId
    );

    if (assistantIndex <= 0) return;

    const previousUser = current.messages
      .slice(0, assistantIndex)
      .reverse()
      .find((message) => message.role === "user");

    if (!previousUser) return;
stopGenerationRef.current = false;
    setStreaming(true);

    try {
const history = current.messages
  .slice(0, assistantIndex)
  .slice(-20);
abortControllerRef.current = new AbortController();

const assistantMessage =
    current.messages[assistantIndex];

if (assistantMessage.type === "image") {

    const generatedImage =
        await generateImage(previousUser.text);

    setConversations(prev =>
        prev.map(chat =>
            chat.id === chatId
            ? {
                ...chat,
                messages: chat.messages.map(msg =>
                    msg.id === assistantMessageId
                        ? {
                            ...msg,
                            image: generatedImage,
                        }
                        : msg
                )
            }
            : chat
        )
    );

    return;
}

const reply = await getGeminiResponse(
  history,
  abortControllerRef.current.signal
);
if (reply === "__QUOTA_EXCEEDED__") {
  toast.error(
    "Daily Gemini quota reached. Please try again tomorrow or add your own API key in Settings."
  );
  return;
}

if (reply === "__INVALID_API_KEY__") {
  toast.error(
    "Invalid Gemini API key. Please update it in Settings."
  );
  return;
}

    await typeText(
  reply,
  (currentText) => {
    setConversations((prev) =>
      prev.map((chat) => {
        if (chat.id !== chatId) return chat;

        const updatedMessages = chat.messages.map((message) =>
          message.id === assistantMessageId
            ? {
                ...message,
                text: currentText,
              }
            : message
        );

        return {
          ...chat,
          messages: updatedMessages,
        };
      })
    );
  },
  () => stopGenerationRef.current
);

if (voiceEnabled && reply.trim()) {
  stopSpeaking();

  setTimeout(() => {
    speak(reply);
  }, 150);
}
    } catch (error) {
       if (error.name === "AbortError") {
    return;
  }
      console.error(error);
    } finally {
      setStreaming(false);
       abortControllerRef.current = null;
    }
  };

  const saveEditedMessage = async (text) => {
if (!text.trim() || loading || streaming)
    return;

  const chatId = currentChatId;

  const current = conversations.find(
    (chat) => chat.id === chatId
  );

  if (!current) return;

  const messageIndex = current.messages.findIndex(
    (msg) => msg.id === editingMessageId
  );

  if (messageIndex === -1) return;

  // User message update + uske baad ki conversation remove
  const updatedMessages = current.messages.slice(0, messageIndex + 1);

  const isFirstMessage = messageIndex === 0;

  updatedMessages[messageIndex] = {
    ...updatedMessages[messageIndex],
    text: text,
  };

setConversations((prev) =>
  prev.map((chat) =>
    chat.id === chatId
      ? {
          ...chat,
          title: isFirstMessage
            ? createChatTitle(text)
            : chat.title,
          messages: updatedMessages,
        }
      : chat
  )
);

if (isFirstMessage) {
const titlePrompt = text;

const title = generateChatTitle(titlePrompt);

setConversations((prev) =>
  prev.map((chat) =>
    chat.id === chatId
      ? {
          ...chat,
          title: title || createChatTitle(titlePrompt),
        }
      : chat
  )
);
}

cancelEditing();
stopGenerationRef.current = false;
setStreaming(true);
  try {
const history = updatedMessages.slice(-20);
abortControllerRef.current = new AbortController();
const editedMessage = updatedMessages[messageIndex];

if (editedMessage.mode === "image") {

    const image = await generateImage(text);

    setConversations(prev =>
        prev.map(chat =>
            chat.id === chatId
            ? {
                ...chat,
                messages: [
                    ...chat.messages,
                    {
                        id: crypto.randomUUID(),
                        role: "assistant",
                        type: "image",
                        image,
                        prompt: text,
                    },
                ],
            }
            : chat
        )
    );

    return;
}

const reply = await getGeminiResponse(
  history,
  abortControllerRef.current.signal
);
if (reply === "__QUOTA_EXCEEDED__") {
  toast.error(
    "Daily Gemini quota reached. Please try again tomorrow or add your own API key in Settings."
  );
  return;
}

if (reply === "__INVALID_API_KEY__") {
  toast.error(
    "Invalid Gemini API key. Please update it in Settings."
  );
  return;
}
    const assistantId = crypto.randomUUID();

    setConversations((prev) =>
      prev.map((chat) => {
        if (chat.id !== chatId) return chat;

        return {
          ...chat,
          messages: [
            ...chat.messages,
            {
              id: assistantId,
              role: "assistant",
                type: "text",
                text: "",
            },
          ],
        };
      })
    );

  await typeText(
  reply,
  (currentText) => {
      setConversations((prev) =>
        prev.map((chat) => {
          if (chat.id !== chatId) return chat;

       const msgs = chat.messages.map((message) =>
  message.id === assistantId
    ? {
        ...message,
        text: currentText,
      }
    : message
);

          return {
            ...chat,
            messages: msgs,
          };
        })
      );
      },
  () => stopGenerationRef.current
);
if (voiceEnabled && reply.trim()) {
  stopSpeaking();

  setTimeout(() => {
    speak(reply);
  }, 150);
}
  }catch (error) {
     if (error.name === "AbortError") {
    return;
  }
  console.error(error);

  setConversations((prev) =>
    prev.map((chat) => {
      if (chat.id !== chatId) return chat;

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
}
finally {
  setStreaming(false);
   abortControllerRef.current = null;
}
};

const clearAllChats = () => {
const chat = {
  id: crypto.randomUUID(),
  title: "New Chat",
  messages: [],
  pinned: false,
};

  setConversations([chat]);

  setCurrentChatId(chat.id);

  localStorage.removeItem("conversations");
};

return {
  conversations,
  currentChatId,
  messages,

  loading,
  streaming,

  editingMessageId,
  editingText,
  setEditingText,
  cancelEditing,
  saveEditedMessage,

  sendMessage,
  regenerateResponse,
  stopGeneration,

  setVoiceEnabled,
  startEditingMessage,

  newChat,
  selectChat,
  deleteChat,
   clearAllChats,
  renameChat,
  voiceEnabled,
  togglePin,
};
}