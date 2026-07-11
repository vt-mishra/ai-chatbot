import { FiSearch } from "react-icons/fi";

function SidebarSearch({
  search,
  setSearch,
}) {
  return (
    <div className="px-4 pb-4">
      <div className="flex items-center bg-zinc-800 rounded-xl px-3">

        <FiSearch className="text-zinc-400" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search chats..."
          className="bg-transparent outline-none px-3 py-3 w-full text-sm"
        />

      </div>
    </div>
  );
}

export default SidebarSearch;