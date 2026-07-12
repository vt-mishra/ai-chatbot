import { useEffect, useRef, useState } from "react";
import {
  FiMessageSquare,
} from "react-icons/fi";
import { LuPin } from "react-icons/lu";
import ChatMenu from "./ChatMenu";

function ConversationItem({
  chat,
  active,
  onSelect,
  onDelete,
  onRename,
  onTogglePin,
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
        className="flex flex-1 items-center gap-3 min-w-0 p-3 text-left"
      >
        <FiMessageSquare
          style={{
            color: "var(--text-secondary)",
          }}
        />

        {chat.pinned && (
          <LuPin
            size={14}
            className="text-yellow-500 shrink-0"
          />
        )}

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
              if (e.key === "Enter") saveTitle();

              if (e.key === "Escape") {
                setTitle(chat.title);
                setEditing(false);
              }
            }}
            className="flex-1 bg-transparent border-b outline-none"
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
        className="flex items-center opacity-0 group-hover:opacity-100 transition mr-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onTogglePin}
          title={
            chat.pinned
              ? "Unpin Chat"
              : "Pin Chat"
          }
          className={`mr-1 rounded-lg p-2 transition ${
            chat.pinned
              ? "text-yellow-500"
              : ""
          }`}
          style={{
            color: chat.pinned
              ? "#eab308"
              : "var(--text-secondary)",
          }}
        >
          <LuPin size={15} />
        </button>

      <ChatMenu
  onRename={() => setEditing(true)}
  onDelete={onDelete}
  onTogglePin={onTogglePin}
  pinned={chat.pinned}
/>
      </div>
    </div>
  );
}

export default ConversationItem;