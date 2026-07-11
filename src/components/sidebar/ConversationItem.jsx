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
      className="group flex items-center justify-between rounded-xl mb-1 transition-all"
      style={{
        background: active
          ? "var(--card)"
          : "transparent",
        border: active
          ? "1px solid var(--border)"
          : "1px solid transparent",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.background =
            "var(--card)";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.background =
            "transparent";
        }
      }}
    >
      <button
        onClick={onSelect}
        className="flex flex-1 min-w-0 items-center gap-3 p-3 text-left"
      >
        <FiMessageSquare
          style={{
            color: "var(--text-secondary)",
          }}
        />

        {editing ? (
          <input
            ref={inputRef}
            value={title}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            onBlur={saveTitle}
            onKeyDown={(e) => {
              if (e.key === "Enter")
                saveTitle();

              if (e.key === "Escape") {
                setTitle(chat.title);
                setEditing(false);
              }
            }}
            className="flex-1 bg-transparent outline-none border-b"
            style={{
              color: "var(--text)",
              borderColor: "var(--border)",
            }}
          />
        ) : (
          <span
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={(e) => {
              e.stopPropagation();
              setEditing(true);
            }}
            className="flex-1 truncate cursor-text"
            style={{
              color: "var(--text)",
            }}
          >
            {chat.title}
          </span>
        )}
      </button>

      <div
        className="mr-2 opacity-0 transition group-hover:opacity-100"
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