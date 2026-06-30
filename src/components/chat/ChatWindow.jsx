import { useEffect, useRef } from "react";
import Header from "../layout/Header";
import ChatInput from "./ChatInput";
import Message from "./Message";
import EmptyState from "./EmptyState";
import useChat from "../../hooks/useChat";

function ChatWindow() {
  const { messages, loading, sendMessage } = useChat();

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <main className="flex flex-1 flex-col bg-[#212121]">
      <Header />

      <div className="flex-1 overflow-y-auto p-6">
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {messages.map((message, index) => (
              <Message
                key={index}
                role={message.role}
                text={message.text}
              />
            ))}

            {loading && (
              <div className="flex justify-start mb-5">
                <div className="bg-zinc-800 text-white rounded-2xl px-4 py-3 animate-pulse">
                  Gemini is typing...
                </div>
              </div>
            )}

            <div ref={bottomRef}></div>
          </>
        )}
      </div>

      <ChatInput
        sendMessage={sendMessage}
        loading={loading}
      />
    </main>
  );
}

export default ChatWindow;