import {
  FiMenu,
  FiPlus,
  FiMessageSquare,
  FiSettings,
} from "react-icons/fi";

function Sidebar() {
  const chats = [
    "React Interview",
    "Travel Planner",
    "Resume Review",
  ];

  return (
    <aside className="w-72 bg-[#171717] border-r border-zinc-800 flex flex-col">

      {/* Top */}

      <div className="p-4">

        <button className="flex items-center justify-center gap-2 w-full rounded-xl bg-zinc-800 hover:bg-zinc-700 transition p-3">

          <FiPlus />

          New Chat

        </button>

      </div>

      {/* Chats */}

      <div className="flex-1 overflow-y-auto px-3">

        {chats.map((chat, index) => (

          <button
            key={index}
            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-zinc-800 transition text-left"
          >

            <FiMessageSquare />

            <span className="truncate">
              {chat}
            </span>

          </button>

        ))}

      </div>

      {/* Bottom */}

      <div className="border-t border-zinc-800 p-4">

        <button className="flex items-center gap-3 hover:bg-zinc-800 w-full rounded-lg p-3">

          <FiSettings />

          Settings

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;