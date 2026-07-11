import {
  FiX,
  FiMoon,
  FiSun,
  FiMonitor,
  FiVolume2,
  FiTrash2,
  FiZap,
} from "react-icons/fi";

import { useThemeContext } from "../../context/ThemeContext";
import { useChatContext } from "../../context/ChatContext";

function SettingsDrawer({ open, onClose }) {
  const { theme, setTheme } = useThemeContext();

  const isDark = theme === "dark";

const drawerStyle = {
  background: isDark ? "#202123" : "#ffffff",
  color: isDark ? "#ffffff" : "#111827",
  borderColor: isDark ? "#3f3f46" : "#e5e7eb",
};

const cardStyle = {
  background: isDark ? "#27272a" : "#f3f4f6",
  color: isDark ? "#ffffff" : "#111827",
};

const headingStyle = {
  color: isDark ? "#a1a1aa" : "#6b7280",
};

  const {
    voiceEnabled,
    setVoiceEnabled,
  } = useChatContext();

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className={`
fixed inset-0
bg-black/40
z-40
transition
${open ? "opacity-100" : "pointer-events-none opacity-0"}
`}
      />

      {/* Drawer */}

      <div
        className={`
fixed
right-0
top-0
z-50
h-screen
w-96
border-l
transition-transform
duration-300
${open ? "translate-x-0" : "translate-x-full"}
`}style={drawerStyle}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b p-5"
style={{
  borderColor: drawerStyle.borderColor,
}}>

          <h2 className="text-xl font-semibold">
            Settings
          </h2>

          <button
            onClick={onClose}
           className="rounded-lg p-2 transition"
style={{
  color: drawerStyle.color,
}}
          >
            <FiX />
          </button>

        </div>

        {/* Body */}

        <div className="space-y-8 p-6">

          {/* ======================= */}

          <div>

            <h3 className="mb-4 text-sm uppercase tracking-wide"
style={headingStyle}> 

              Appearance

            </h3>

            <div className="space-y-2">

              <button
                onClick={() => setTheme("dark")}
                className={`flex w-full items-center justify-between rounded-xl p-3 transition ${
                  theme === "dark"
                    ? "bg-blue-600"
                    : ""
                }`}
                style={
  theme === "dark"
    ? {}
    : cardStyle
}
              >
                <span className="flex items-center gap-3">
                  <FiMoon />
                  Dark
                </span>

                {theme === "dark" && "✓"}
              </button>

              <button
                onClick={() => setTheme("light")}
                className={`flex w-full items-center justify-between rounded-xl p-3 transition ${
                  theme === "light"
                    ? "bg-blue-600"
                    : "bg-zinc-800 hover:bg-zinc-700"
                }`}
              >
                <span className="flex items-center gap-3">
                  <FiSun />
                  Light
                </span>

                {theme === "light" && "✓"}
              </button>

              <button
                className="flex w-full items-center justify-between rounded-xl p-3 transition"
style={cardStyle}
              >
                <span className="flex items-center gap-3">
                  <FiMonitor />
                  System
                </span>

                Coming Soon
              </button>

            </div>

          </div>

          {/* ======================= */}

          <div>

            <h3 className="mb-4 text-sm uppercase tracking-wide"style={headingStyle}>

              Voice

            </h3>

            <button
              onClick={() =>
                setVoiceEnabled(!voiceEnabled)
              }
              className="flex w-full items-center justify-between rounded-xl"
            >
              <span className="flex items-center gap-3">

                <FiVolume2 />

                Voice Replies

              </span>

              <span>

                {voiceEnabled ? "ON" : "OFF"}

              </span>

            </button>

          </div>

          {/* ======================= */}

          <div>

            <h3 className="mb-4 text-sm uppercase tracking-wide" style={headingStyle}>

              AI

            </h3>

            <button
              className="flex w-full items-center justify-between rounded-xl"style={cardStyle}
            >
              <span className="flex items-center gap-3">

                <FiZap />

                Typing Speed

              </span>

              Fast
            </button>

          </div>

          {/* ======================= */}

          <div>

            <h3 className="mb-4 text-sm uppercase tracking-wide" style={headingStyle}>

              Data

            </h3>

            <button
              className="
w-full
rounded-xl
bg-red-600
p-3
transition
hover:bg-red-700
flex
items-center
justify-center
gap-2
"
            >
              <FiTrash2 />

              Clear All Chats

            </button>

          </div>

          {/* ======================= */}

          <div className="pt-5 text-center text-xs"
style={headingStyle}>

            V/S Chatbot

            <br />

            Version 2.0

          </div>

        </div>
      </div>
    </>
  );
}

export default SettingsDrawer;