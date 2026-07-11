import { useEffect, useRef, useState } from "react";
import { FiMessageSquare } from "react-icons/fi";
import ChatMenu from "./ChatMenu";

function ConversationItem({
  chat,
  active,
  onSelect,
  onDelete,
  onRename,
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(chat.title);

  const inputRef = useRef(null);

  useEffect(() => {
    setTitle(chat.title);
  }, [chat.title]);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const saveTitle = () => {
    const value = title.trim();

    if (!value) {
      setTitle(chat.title);
    } else if (value !== chat.title) {
      onRename(value);
    }

    setEditing(false);
  };

  return (
  <div
  className={`group flex items-center justify-between rounded-xl mb-1 transition overflow-hidden
  ${active ? "bg-zinc-800" : "hover:bg-zinc-800"}`}
>
    <button
  onClick={() => {
  console.log("Selected:", chat.id);
  onSelect();
}}
  className="flex items-center gap-3 flex-1 min-w-0 p-3 text-left"
>
        <FiMessageSquare />

        {editing ? (
          <input
            ref={inputRef}
            value={title}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={saveTitle}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveTitle();
              }

              if (e.key === "Escape") {
                setTitle(chat.title);
                setEditing(false);
              }
            }}
            className="bg-transparent outline-none border-b border-zinc-500 flex-1 text-white"
          />
        ) : (
       <span
  onClick={(e) => e.stopPropagation()}
  onDoubleClick={(e) => {
    e.stopPropagation();
    setEditing(true);
  }}
  className="flex-1 min-w-0 truncate cursor-text"
>
  {chat.title}
</span>
        )}
      </button>

<div
  className="opacity-0 group-hover:opacity-100 transition mr-2"
  onClick={(e) => e.stopPropagation()}
>
  <ChatMenu
    onRename={() => setEditing(true)}
    onDelete={onDelete}
  />
</div>
    </div>
  );
}

export default ConversationItem;