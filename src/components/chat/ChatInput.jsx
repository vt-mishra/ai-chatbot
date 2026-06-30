import { useState } from "react";
import { FiSend } from "react-icons/fi";

function ChatInput({
  sendMessage,
  loading,
  streaming,
}) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim() || loading || streaming) return;

    sendMessage(text);
    setText("");
  };

  return (
    <div className="p-5">
      <div className="flex items-center rounded-2xl bg-zinc-800 p-2">

        <input
          type="text"
          value={text}
          disabled={loading || streaming}
          placeholder={
            loading
              ? "Gemini is thinking..."
              : streaming
              ? "Gemini is typing..."
              : "Message AI..."
          }
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !e.shiftKey
            ) {
              e.preventDefault();
              handleSend();
            }
          }}
          className="flex-1 bg-transparent outline-none px-3 py-2 text-white placeholder:text-zinc-400 disabled:opacity-60"
        />

        <button
          onClick={handleSend}
          disabled={loading || streaming}
          className="rounded-full bg-white text-black p-3 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiSend />
        </button>

      </div>
    </div>
  );
}

export default ChatInput;