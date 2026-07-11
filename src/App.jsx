import Sidebar from "./components/layout/Sidebar";
import ChatWindow from "./components/chat/ChatWindow";

function App() {
  return (
    <div
      className="flex h-screen overflow-hidden transition-colors duration-300"
      style={{
        background: "var(--bg)",
        color: "var(--text)",
      }}
    >
      <Sidebar />
      <ChatWindow />
    </div>
  );
}

export default App;