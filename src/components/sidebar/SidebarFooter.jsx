import { FiSettings } from "react-icons/fi";

function SidebarFooter() {
  return (
    <div className="border-t border-zinc-800 p-4">
      <button className="flex items-center gap-3 w-full rounded-lg p-3 hover:bg-zinc-800">
        <FiSettings />
        Settings
      </button>
    </div>
  );
}

export default SidebarFooter;