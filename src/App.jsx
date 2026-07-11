import Sidebar from "./components/layout/Sidebar";
import ChatWindow from "./components/chat/ChatWindow";

function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#212121]">
      <Sidebar />
      <ChatWindow />
    </div>
  );
}

export default App;