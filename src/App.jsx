import Sidebar from "./components/layout/Sidebar";
import ChatWindow from "./components/chat/ChatWindow";

function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <ChatWindow />
    </div>
  );
}

export default App;