import { useEffect, useRef, useState } from "react";
import { FiMessageSquare } from "react-icons/fi";
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
      className="
        group
        mb-1
        flex
        items-center
        justify-between
        rounded-xl
        transition-all
        hover:bg-[var(--card)]
      "
      style={{
        background: active
          ? "var(--card)"
          : "transparent",
        border: active
          ? "1px solid var(--border)"
          : "1px solid transparent",
      }}
    >
      <button
        onClick={onSelect}
        className="
          flex
          flex-1
          min-w-0
          items-center
          gap-2
          md:gap-3
          px-3
          py-3
          text-left
          active:scale-[0.98]
          transition
        "
      >
        <FiMessageSquare
          style={{
            color: "var(--text-secondary)",
          }}
        />

        {chat.pinned && (
          <LuPin
            size={14}
            className="shrink-0 text-yellow-500"
          />
        )}

        {editing ? (
          <input
            ref={inputRef}
            id="conversation-title"
            name="conversationTitle"
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
            className="
              flex-1
              border-b
              bg-transparent
              outline-none
            "
            style={{
              color: "var(--text)",
              borderColor: "var(--border)",
            }}
          />
        ) : (
          <span
            onClick={(e) => e.stopPropagation()}
            className="
              flex-1
              truncate
              text-sm
              md:text-base
            "
            style={{
              color: "var(--text)",
            }}
          >
            {chat.title}
          </span>
        )}
      </button>

      <div
        className="
          mr-2
          flex
          items-center
          opacity-100
          transition

          md:opacity-0
          md:group-hover:opacity-100
        "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onTogglePin}
          title={
            chat.pinned
              ? "Unpin Chat"
              : "Pin Chat"
          }
          className="
            mr-1
            rounded-lg
            p-2
            transition
            active:scale-90
          "
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