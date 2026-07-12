import ConversationItem from "./ConversationItem";
import { useChatContext } from "../../context/ChatContext";

function ConversationList({ chats }) {
  const {
    currentChatId,
    selectChat,
    deleteChat,
    renameChat,
    togglePin,
  } = useChatContext();

  if (chats.length === 0) {
    return (
      <p className="mt-6 text-center text-zinc-500">
        No chats found
      </p>
    );
  }

const sortedChats = [...chats].sort((a, b) => {
  if (a.pinned !== b.pinned) {
    return a.pinned ? -1 : 1;
  }

  return (
    new Date(b.updatedAt || 0) -
    new Date(a.updatedAt || 0)
  );
});

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden px-3">
      {sortedChats.map((chat) => (
        <ConversationItem
          key={chat.id}
          chat={chat}
          active={chat.id === currentChatId}
          onSelect={() => selectChat(chat.id)}
          onDelete={() => deleteChat(chat.id)}
          onRename={(title) =>
            renameChat(chat.id, title)
          }
          onTogglePin={() =>
            togglePin(chat.id)
          }
        />
      ))}
    </div>
  );
}

export default ConversationList;