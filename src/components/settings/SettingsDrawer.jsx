import {
  FiX,
  FiMoon,
  FiSun,
  FiMonitor,
  FiVolume2,
  FiTrash2,
  FiZap,
  FiDownload,
  FiFileText,
} from "react-icons/fi";

import { useThemeContext } from "../../context/ThemeContext";
import { useChatContext } from "../../context/ChatContext";

import {
  downloadPDF,
  downloadMarkdown,
} from "../../utils/exportChat";
import Swal from "sweetalert2";

function SettingsDrawer({ open, onClose }) {
  const { theme, setTheme } = useThemeContext();

  const isDark = theme === "dark";

const drawerStyle = {
  background: "var(--sidebar)",
  color: "var(--text)",
  borderColor: "var(--border)",
  boxShadow: "0 0 40px rgba(0,255,255,.08)",
};

const cardStyle = {
  background: "var(--card)",
  color: "var(--text)",
  border: "1px solid var(--border)",
  boxShadow: "0 0 18px rgba(0,255,255,.08)",
};

const activeButtonStyle = {
  background: "linear-gradient(135deg,#00F5FF,#8B5CF6)",
  color: "#fff",
  boxShadow: "0 0 25px rgba(0,255,255,.45)",
};

const handleHover = (e) => {
  e.currentTarget.style.transform = "translateY(-2px)";
  e.currentTarget.style.boxShadow =
    "0 0 25px rgba(0,255,255,.35)";
};

const handleLeave = (e) => {
  e.currentTarget.style.transform = "translateY(0)";

  if (
    e.currentTarget.dataset.active === "true"
  ) {
    e.currentTarget.style.boxShadow =
      "0 0 25px rgba(0,255,255,.45)";
  } else {
    e.currentTarget.style.boxShadow = "";
  }
};
  const headingStyle = {
    color: isDark ? "#a1a1aa" : "#6b7280",
  };

  const {
     voiceEnabled,
  setVoiceEnabled,
  messages,
  clearAllChats,
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
flex
flex-col
transition-transform
duration-300
${open ? "translate-x-0" : "translate-x-full"}
`}
        style={drawerStyle}
      >
        {/* Header */}

      <div
  className="flex items-center justify-between border-b p-5 flex-shrink-0"
  style={{
    borderColor: drawerStyle.borderColor,
  }}
>
          <h2 className="text-xl font-semibold">
            Settings
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition"
            style={{
              color: drawerStyle.color,
            }}
              onMouseEnter={handleHover}
    onMouseLeave={handleLeave}
          >
            <FiX />
          </button>
        </div>

        {/* Body */}

        <div
  className="flex-1 overflow-y-auto p-6 space-y-8"
>

          {/* Appearance */}

          <div>

            <h3
              className="mb-4 text-sm uppercase tracking-wide"
              style={headingStyle}
            >
              Appearance
            </h3>

            <div className="space-y-2">

              <button
  onClick={() => setTheme("dark")}
  data-active={theme === "dark"}
  className="flex w-full items-center justify-between rounded-xl p-3 transition-all duration-300"
  style={
    theme === "dark"
      ? activeButtonStyle
      : cardStyle
  }
  onMouseEnter={handleHover}
  onMouseLeave={handleLeave}
>
  <span className="flex items-center gap-3">
    <FiMoon />
    Dark
  </span>

  {theme === "dark" && "✓"}
</button>

           <button
  onClick={() => setTheme("light")}
  data-active={theme === "light"}
  className="flex w-full items-center justify-between rounded-xl p-3 transition-all duration-300"
  style={
    theme === "light"
      ? activeButtonStyle
      : cardStyle
  }
  onMouseEnter={handleHover}
  onMouseLeave={handleLeave}
>
  <span className="flex items-center gap-3">
    <FiSun />
    Light
  </span>

  {theme === "light" && "✓"}
</button>

             <button
  className="flex w-full items-center justify-between rounded-xl p-3 transition-all duration-300"
  style={cardStyle}
  onMouseEnter={handleHover}
  onMouseLeave={handleLeave}
>
  <span className="flex items-center gap-3">
    <FiMonitor />
    System
  </span>

  Coming Soon
</button>

            </div>

          </div>

          {/* Voice */}

          <div>

            <h3
              className="mb-4 text-sm uppercase tracking-wide"
              style={headingStyle}
            >
              Voice
            </h3>

            <button
              onClick={() =>
                setVoiceEnabled(!voiceEnabled)
              }
              className="flex w-full items-center justify-between rounded-xl p-3 transition"
              style={cardStyle}
                onMouseEnter={handleHover}
    onMouseLeave={handleLeave}
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

          {/* AI */}

          <div>

            <h3
              className="mb-4 text-sm uppercase tracking-wide"
              style={headingStyle}
            >
              AI
            </h3>

            <button
              className="flex w-full items-center justify-between rounded-xl p-3 transition"
              style={cardStyle}
                onMouseEnter={handleHover}
    onMouseLeave={handleLeave}
            >
              <span className="flex items-center gap-3">
                <FiZap />
                Typing Speed
              </span>

              Fast
            </button>

          </div>

          {/* Export */}

          <div>

            <h3
              className="mb-4 text-sm uppercase tracking-wide"
              style={headingStyle}
            >
              Export
            </h3>

            <div className="space-y-2">

              <button
                onClick={() => downloadPDF(messages)}
                className="flex w-full items-center justify-between rounded-xl p-3 transition"
                style={cardStyle}
                  onMouseEnter={handleHover}
    onMouseLeave={handleLeave}
              >
                <span className="flex items-center gap-3">
                  <FiDownload />
                  Export PDF
                </span>
              </button>

              <button
                onClick={() => downloadMarkdown(messages)}
                className="flex w-full items-center justify-between rounded-xl p-3 transition"
                style={cardStyle}
                  onMouseEnter={handleHover}
    onMouseLeave={handleLeave}
              >
                <span className="flex items-center gap-3">
                  <FiFileText />
                  Export Markdown
                </span>
              </button>

            </div>

          </div>

          {/* Data */}

          <div>

            <h3
              className="mb-4 text-sm uppercase tracking-wide"
              style={headingStyle}
            >
              Data
            </h3>

<button
  onClick={async () => {
    const result = await Swal.fire({
      title: "Clear all chats?",
      text: "This action cannot be undone.",
      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Delete",

      cancelButtonText: "Cancel",

      confirmButtonColor: "#dc2626",

      cancelButtonColor: "#3f3f46",

      background: theme === "dark"
        ? "#202123"
        : "#ffffff",

      color:
        theme === "dark"
          ? "#ffffff"
          : "#111827",
    });

    if (!result.isConfirmed) return;

    clearAllChats();

    onClose();

    Swal.fire({
      icon: "success",

      title: "Deleted",

      text: "All chats have been removed.",

      timer: 1500,

      showConfirmButton: false,

      background:
        theme === "dark"
          ? "#202123"
          : "#ffffff",

      color:
        theme === "dark"
          ? "#ffffff"
          : "#111827",
    });
  }}
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
  onMouseEnter={handleHover}
    onMouseLeave={handleLeave}
>
  <FiTrash2 />

  Clear All Chats
</button>

          </div>

          {/* Footer */}

          <div
            className="pt-5 text-center text-xs"
            style={headingStyle}
          >
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