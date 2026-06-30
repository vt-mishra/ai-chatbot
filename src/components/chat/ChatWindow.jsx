import { useEffect, useRef } from "react";
import Header from "../layout/Header";
import ChatInput from "./ChatInput";
import Message from "./Message";
import EmptyState from "./EmptyState";
import TypingIndicator from "./TypingIndicator";
import useChat from "../../hooks/useChat";

function ChatWindow() {
  const {
    messages,
    loading,
    streaming,
    sendMessage,
  } = useChat();

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading, streaming]);

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

            {loading && <TypingIndicator />}

            <div ref={bottomRef} />
          </>
        )}
      </div>

      <ChatInput
        sendMessage={sendMessage}
        loading={loading}
        streaming={streaming}
      />
    </main>
  );
}

export default ChatWindow;