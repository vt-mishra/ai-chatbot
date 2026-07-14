import { useState } from "react";

import Sidebar from "./components/layout/Sidebar";
import ChatWindow from "./components/chat/ChatWindow";
import SettingsDrawer from "./components/settings/SettingsDrawer";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
const [settingsOpen, setSettingsOpen] = useState(false);
  return (
    <div
      className="flex h-screen overflow-hidden transition-colors duration-300"
      style={{
        background: "var(--bg)",
        color: "var(--text)",
      }}
    >
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
          onOpenSettings={() => setSettingsOpen(true)}
      />

      <ChatWindow
        onOpenSidebar={() => setSidebarOpen(true)}
      />
      <SettingsDrawer
    open={settingsOpen}
    onClose={() => setSettingsOpen(false)}
/>
    </div>
    
  );
}

export default App;