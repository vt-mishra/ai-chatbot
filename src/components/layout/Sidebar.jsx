import { useMemo, useState } from "react";
import { useChatContext } from "../../context/ChatContext";

import SidebarHeader from "../sidebar/SidebarHeader";
import SidebarSearch from "../sidebar/SidebarSearch";
import ConversationList from "../sidebar/ConversationList";
import SidebarFooter from "../sidebar/SidebarFooter";

function Sidebar() {
  const { conversations } = useChatContext();

  const [search, setSearch] = useState("");

const filteredChats = useMemo(() => {
  return conversations.filter((chat) =>
    (chat?.title ?? "")
      .toLowerCase()
      .includes((search ?? "").toLowerCase())
  );
}, [conversations, search]);

  return (
<aside className="w-72 min-w-72 h-screen overflow-hidden bg-[#171717] border-r border-zinc-800 flex flex-col">
      <SidebarHeader />

      <SidebarSearch
        search={search}
        setSearch={setSearch}
      />

  <div className="flex-1 overflow-y-auto">
  <ConversationList chats={filteredChats} />
</div>

      <SidebarFooter />
    </aside>
  );
}

export default Sidebar;