import { useEffect, useRef, useState, React } from "react";
import { FiArrowDown } from "react-icons/fi";

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
    startEditingMessage,
  } = useChatContext();

  const scrollRef = useRef(null);
  const shouldAutoScroll = useRef(true);

  const [showScrollButton, setShowScrollButton] =
    useState(false);

  const scrollToBottom = (smooth = true) => {
    const container = scrollRef.current;

    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: smooth ? "smooth" : "auto",
    });
  };

  useEffect(() => {
    if (shouldAutoScroll.current) {
      scrollToBottom(false);
    }
  }, [messages]);

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    const handleScroll = () => {
      const distance =
        container.scrollHeight -
        container.scrollTop -
        container.clientHeight;

      shouldAutoScroll.current = distance < 150;

      setShowScrollButton(distance > 250);
    };

    container.addEventListener(
      "scroll",
      handleScroll
    );

    handleScroll();

    return () =>
      container.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <main
      className="flex flex-1 min-h-0 flex-col transition-colors duration-300"
      style={{
        background: "var(--bg)",
      }}
    >
      <Header />

      <div className="relative flex-1 min-h-0">
        <div
          ref={scrollRef}
          className="absolute inset-0 overflow-y-auto p-6"
        >
          {messages.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {messages.map((message) => (
                <Message
                  key={message.id}
                  messageId={message.id}
                  role={message.role}
                  text={message.text}
                  image={message.image}
                  type={message.type}
                  prompt={message.prompt}
                  fileName={message.fileName}
                  fileType={message.fileType}
                  onEdit={startEditingMessage}
                />
              ))}

              {loading && <TypingIndicator />}
            </>
          )}
        </div>

        {showScrollButton && (
          <button
            onClick={() => scrollToBottom(true)}
            className="absolute bottom-6 right-6 z-50 rounded-full p-3 shadow-xl transition hover:scale-110"
            style={{
              background: "var(--card)",
              color: "var(--text)",
              border: "1px solid var(--border)",
            }}
          >
            <FiArrowDown size={20} />
          </button>
        )}
      </div>

      <ChatInput />
    </main>
  );
}

export default ChatWindow;