import { FiPlus } from "react-icons/fi";
import { useChatContext } from "../../context/ChatContext";

function SidebarHeader() {
  const { newChat } = useChatContext();

  return (
    <div className="p-4">
      <button
        onClick={newChat}
        className="w-full rounded-xl bg-zinc-800 hover:bg-zinc-700 transition p-3 flex items-center justify-center gap-2"
      >
        <FiPlus />
        New Chat
      </button>
    </div>
  );
}

export default SidebarHeader;