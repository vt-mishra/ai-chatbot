import { FiSearch } from "react-icons/fi";

function SidebarSearch({
  search,
  setSearch,
}) {
  return (
    <div className="px-4 pb-4">
      <div
        className="flex items-center rounded-xl px-3 transition"
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
        }}
      >
        <FiSearch
          size={18}
          style={{
            color: "var(--text-secondary)",
          }}
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search chats..."
          className="w-full bg-transparent px-3 py-3 text-sm outline-none"
          style={{
            color: "var(--text)",
          }}
        />
      </div>
    </div>
  );
}

export default SidebarSearch;