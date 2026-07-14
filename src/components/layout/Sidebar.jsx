import { useMemo, useState } from "react";
import { useChatContext } from "../../context/ChatContext";

import SidebarHeader from "../sidebar/SidebarHeader";
import SidebarSearch from "../sidebar/SidebarSearch";
import ConversationList from "../sidebar/ConversationList";
import SidebarFooter from "../sidebar/SidebarFooter";

function Sidebar({ open, onClose,onOpenSettings }) {
  const { conversations } = useChatContext();

  const [search, setSearch] = useState("");

  const filteredChats = useMemo(() => {
    return conversations
      .filter((chat) =>
        (chat.title ?? "")
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .sort((a, b) => {
        if (a.pinned === b.pinned) return 0;
        return a.pinned ? -1 : 1;
      });
  }, [conversations, search]);

  return (
    <>
      {/* Mobile Overlay */}

      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden
          ${
            open
              ? "opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* Sidebar */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          h-screen
          w-[85vw]
          max-w-72
          flex
          flex-col
          transition-transform
          duration-300

          md:relative
          md:w-72
          md:min-w-72
          md:translate-x-0

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
        style={{
          background: "var(--sidebar)",
          borderRight: "1px solid var(--border)",
          color: "var(--text)",
        }}
      >
        <SidebarHeader />

        <SidebarSearch
          search={search}
          setSearch={setSearch}
        />

        <div className="flex-1 overflow-y-auto">
          <ConversationList
            chats={filteredChats}
            onSelectChat={onClose}
          />
        </div>
<SidebarFooter
    onOpenSettings={onOpenSettings}
/>
      </aside>
    </>
  );
}

export default Sidebar;