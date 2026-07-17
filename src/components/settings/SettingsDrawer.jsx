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
  FiCpu,
  FiCode,
  FiUser,
  FiGithub,
  FiLinkedin,
  FiGlobe,
   FiEye, 
   FiEyeOff, 
   FiKey,
   FiSave,
} from "react-icons/fi";

import { useThemeContext } from "../../context/ThemeContext";
import { useChatContext } from "../../context/ChatContext";

import {
  downloadPDF,
  downloadMarkdown,
} from "../../utils/exportChat";
import Swal from "sweetalert2";
import { useState,useEffect } from "react";
import toast from "react-hot-toast";  
import {
  getApiKey,
  getCustomApiKey,
  saveApiKey,
  removeApiKey,
} from "../../utils/apiKey";
function SettingsDrawer({ open, onClose }) {
  const { theme, setTheme } = useThemeContext();

  const isDark = theme === "dark";
const [apiKey, setApiKey] = useState("");
const [usingPersonal, setUsingPersonal] = useState(false);
const [showKey, setShowKey] = useState(false);

const isValidApiKey =
  apiKey.trim().startsWith("AQ.Ab") &&
  apiKey.trim().length > 30;

useEffect(() => {
  const customKey = getCustomApiKey();

  setUsingPersonal(!!customKey);
  setApiKey(customKey || getApiKey());
}, [open]);

const handleSaveApiKey = () => {
  const key = apiKey.trim();

  if (!key) {
    toast.error("Please enter a Gemini API key.");
    return;
  }

  if (!key.startsWith("AQ.Ab")) {
    toast.error("Please enter a valid Gemini API key.");
    return;
  }

  saveApiKey(key);

  setUsingPersonal(true);

  toast.success("Gemini API key saved successfully.");
};

const handleResetApiKey = () => {
  removeApiKey();

  setUsingPersonal(false);
  setApiKey(getApiKey()); // shared key

  toast.success("API key reset.");
};
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

  if (e.currentTarget.dataset.danger === "true") {
    e.currentTarget.style.boxShadow =
      "0 0 28px rgba(239,68,68,.55)";
  } else {
    e.currentTarget.style.boxShadow =
      "0 0 25px rgba(0,255,255,.35)";
  }
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
w-full
max-w-sm
sm:w-96
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
  className="
flex
items-center
justify-between
border-b
px-4
py-4
sm:p-5
shrink-0
"
  style={{
    borderColor: drawerStyle.borderColor,
  }}
>
      <div>
  <h2 className="text-xl font-bold">
    ⚙ Settings
  </h2>

  <p
    className="text-xs"
    style={{ color: "var(--text-secondary)" }}
  >
    Customize your AI experience
  </p>
</div>

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
  className="
flex-1
overflow-y-auto
px-4
py-5
space-y-6
sm:p-6
sm:space-y-8
"
>

          {/* Appearance */}

          <div>

            <h3
      className="
mb-3
text-xs
font-semibold
uppercase
tracking-[0.18em]
sm:text-sm
"
              style={headingStyle}
            >
              Appearance
            </h3>

            <div className="space-y-2">

              <button
  onClick={() => setTheme("dark")}
  data-active={theme === "dark"}
  className="flex w-full items-center justify-between rounded-xl
p-3
sm:p-3
min-h-[52px]transition-all duration-300"
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

{/* API */}
<div
  className="mt-6 rounded-xl p-4 space-y-4"
  style={cardStyle}
>
  <div className="flex items-center gap-2">
    <FiKey size={18} />
    <h3 className="font-semibold">
      Gemini API Key
    </h3>
  </div>

  <p
    style={{
      color: "var(--text-secondary)",
      fontSize: 14,
      lineHeight: 1.6,
    }}
  >
    If the shared API quota is exhausted, you can use
    your own free Gemini API key.
  </p>

  <div className="relative">
    <input
      type={showKey ? "text" : "password"}
      value={apiKey}
      onChange={(e) =>
        setApiKey(e.target.value)
      }
      placeholder="AQ.Ab..."
      className="w-full rounded-xl p-3 pr-12 outline-none"
      style={{
        background: "var(--bg)",
        color: "var(--text)",
        border: "1px solid var(--border)",
      }}
    />

    <button
      onClick={() => setShowKey(!showKey)}
      className="absolute right-3 top-1/2 -translate-y-1/2"
      style={{
        color: "var(--text-secondary)",
      }}
    >
      {showKey ? <FiEyeOff /> : <FiEye />}
    </button>
  </div>

<button
  disabled={!isValidApiKey}
  onClick={handleSaveApiKey}
  className="flex w-full items-center justify-between rounded-xl p-3 transition-all duration-300"
  style={{
    ...(isValidApiKey ? activeButtonStyle : cardStyle),

    cursor: isValidApiKey
      ? "pointer"
      : "not-allowed",

    opacity: isValidApiKey ? 1 : 0.6,
  }}
  onMouseEnter={isValidApiKey ? handleHover : undefined}
  onMouseLeave={isValidApiKey ? handleLeave : undefined}
>
  <span className="flex items-center gap-3">
    <FiSave />
    Save API Key
  </span>

  {isValidApiKey && "✓"}
</button>

<div
  className="text-xs text-center rounded-lg py-2"
  style={{
    background: apiKey
      ? "rgba(34,197,94,.12)"
      : "rgba(59,130,246,.10)",

    color: apiKey
      ? "#22c55e"
      : "#60a5fa",
  }}
>
  {usingPersonal
    ? "✓ Personal Gemini API Key Active"
    : "Using Shared Gemini API Key"}
</div>
<div className="flex flex-col gap-3"> 
<a
  href="https://aistudio.google.com/apikey"
  target="_blank"
  rel="noopener noreferrer"
>
  <button
    className="flex w-full items-center justify-between rounded-xl p-3 transition"
              style={cardStyle}
                onMouseEnter={handleHover}
    onMouseLeave={handleLeave}
  >
     <span className="flex items-center gap-3">
        <FiZap />
    Get Free Gemini API Key 
     </span>
  ↗
  </button>
</a>

{usingPersonal && (
  <button
    onClick={handleResetApiKey}
    className="flex w-full items-center justify-between rounded-xl p-3 transition"
    style={cardStyle}
    onMouseEnter={handleHover}
    onMouseLeave={handleLeave}
  >
    <span className="flex items-center gap-3">
      <FiKey />
      Reset to Default API Key
    </span>

    ↺
  </button>
)}
  <p
    className="text-xs text-center"
    style={{
      color: "var(--text-secondary)",
    }}
  >
    Your API key is stored only in this browser and is
    never sent to our server.
  </p>
  </div>
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

  confirmButtonColor: "#ef4444",
  cancelButtonColor: "#27272a",

  background: "#0f172a",
  color: "#fff",

  customClass: {
    popup: "neon-popup",
    title: "neon-title",
    confirmButton: "neon-delete-btn",
    cancelButton: "neon-cancel-btn",
  },

  buttonsStyling: false,
});

    if (!result.isConfirmed) return;

    clearAllChats();

    onClose();

   toast.success("All chats cleared.");
  }}
  className="
w-full
rounded-xl
p-2
sm:p-3
transition
flex
items-center
justify-center
gap-2
"
style={{
  background: "linear-gradient(135deg,#ef4444,#b91c1c)",
  color: "#fff",
  boxShadow: "0 0 20px rgba(239,68,68,.35)",
}}
data-danger="true"
   onMouseEnter={handleHover}
    onMouseLeave={handleLeave}
>
  <FiTrash2 />

  Clear All Chats
</button>

          </div>

          {/* Footer */}

<div
  className="pt-6 border-t text-center"
  style={{
    borderColor: "var(--border)",
    color: "var(--text-secondary)",
  }}
>
  <div className="flex items-center justify-center gap-2 text-sm font-semibold">
    <FiCpu size={16} style={{ color: "#22d3ee" }} />
    <span>V/S AI v2.0</span>
  </div>

  <div className="mt-3 flex items-center justify-center gap-2 text-xs">
    <FiCode size={14} style={{ color: "#8b5cf6" }} />
    <span>Designed & Developed by</span>
  </div>

  <div
    className="mt-1 flex items-center justify-center gap-2 text-sm font-semibold"
    style={{ color: "var(--text)" }}
  >
    <FiUser size={14} style={{ color: "#00F5FF" }} />
    <span>Vatan Mishra</span>
  </div>

  <div className="mt-4 flex items-center justify-center gap-5">
    <a
      href="https://github.com/vt-mishra"
      target="_blank"
      rel="noopener noreferrer"
      className="social-link"
      style={{ color: "var(--text-secondary)" }}
      title="GitHub"
    >
      <FiGithub size={18} />
    </a>

    <a
      href="https://linkedin.com/in/vatan-mishra-1961b61a4"
      target="_blank"
      rel="noopener noreferrer"
      className="social-link"
      style={{ color: "var(--text-secondary)" }}
      title="LinkedIn"
    >
      <FiLinkedin size={18} />
    </a>

    <a
      href="https://yourportfolio.com"
      target="_blank"
      rel="noopener noreferrer"
      className="social-link"
      style={{ color: "var(--text-secondary)" }}
      title="Portfolio"
    >
      <FiGlobe size={18} />
    </a>
  </div>
</div>

        </div>
      </div>
    </>
  );
}

export default SettingsDrawer;