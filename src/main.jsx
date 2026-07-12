import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";

import { ChatProvider } from "./context/ChatContext";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
  <ThemeProvider>
    <ChatProvider>
      <App />

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 2500,

          style: {
            borderRadius: "12px",
            background: "#27272a",
            color: "#fff",
            fontSize: "14px",
          },
        }}
      />
    </ChatProvider>
  </ThemeProvider>
</React.StrictMode>
);