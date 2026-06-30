import { useState } from "react";
import { FiSend } from "react-icons/fi";

function ChatInput({ sendMessage, loading }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim() || loading) return;

    sendMessage(text);
    setText("");
  };

  return (
    <div className="p-5">
      <div className="flex items-center rounded-2xl bg-zinc-800 p-2">
        <input
          type="text"
          value={text}
          disabled={loading}
          placeholder={loading ? "Gemini is typing..." : "Message AI..."}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          className="flex-1 bg-transparent outline-none px-3 py-2 text-white placeholder:text-zinc-400 disabled:opacity-60"
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="rounded-full bg-white text-black p-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiSend />
        </button>
      </div>
    </div>
  );
}

export default ChatInput;