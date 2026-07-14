import { FiSettings } from "react-icons/fi";

function SidebarFooter({ onOpenSettings }) {
  return (
    <div
      className="p-4"
      style={{
        borderTop: "1px solid var(--border)",
      }}
    >
      <button
        onClick={onOpenSettings}
        className="flex w-full items-center gap-3 rounded-xl p-3 transition-all duration-200 hover:scale-[1.02]"
        style={{
          color: "var(--text)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--card)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
        }}
      >
        <FiSettings
          size={20}
          style={{
            color: "var(--text-secondary)",
          }}
        />

        <span>Settings</span>
      </button>
    </div>
  );
}

export default SidebarFooter;