import { useEffect, useRef } from "react";
import Header from "../layout/Header";
import ChatInput from "./ChatInput";
import Message from "./Message";
import EmptyState from "./EmptyState";
import TypingIndicator from "./TypingIndicator";
import { useChatContext } from "../../context/ChatContext";

function ChatWindow() {
  const {
    messages,
    loading,
    streaming,
    sendMessage,
  } = useChatContext();

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
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
                key={message.id ?? index}
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