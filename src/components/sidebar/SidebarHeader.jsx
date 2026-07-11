import { FiPlus } from "react-icons/fi";
import { useChatContext } from "../../context/ChatContext";

function SidebarHeader() {
  const { newChat } = useChatContext();

  return (
    <div className="p-4">
      <button
        onClick={newChat}
        className="w-full rounded-xl p-3 flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02]"
        style={{
          background: "var(--card)",
          color: "var(--text)",
          border: "1px solid var(--border)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.filter = "brightness(0.95)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.filter = "brightness(1)";
        }}
      >
        <FiPlus size={18} />
        <span className="font-medium">New Chat</span>
      </button>
    </div>
  );
}

export default SidebarHeader;