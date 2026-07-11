import ConversationItem from "./ConversationItem";
import { useChatContext } from "../../context/ChatContext";

function ConversationList({ chats }) {
  const {
    currentChatId,
    selectChat,
    deleteChat,
    renameChat,
  } = useChatContext();

  if (chats.length === 0) {
    return (
      <p className="text-zinc-500 text-center mt-6">
        No chats found
      </p>
    );
  }

  return (
   <div className="flex-1 overflow-y-auto overflow-x-hidden px-3">
      {chats.map((chat) => (
        <ConversationItem
          key={chat.id}
          chat={chat}
          active={chat.id === currentChatId}
          onSelect={() => selectChat(chat.id)}
          onDelete={() => deleteChat(chat.id)}
          onRename={(title) => renameChat(chat.id, title)}
        />
      ))}
    </div>
  );
}

export default ConversationList;