import { useState } from "react";
import {
  saveApiKey,
  removeApiKey,
  hasCustomApiKey,
  getApiKey,
} from "../../utils/apiKey";
import { FiX, FiKey, FiExternalLink } from "react-icons/fi";

function SettingsModal({ open, onClose }) {
  const [apiKey, setApiKey] = useState(getApiKey());

  if (!open) return null;

  const handleSave = () => {
    if (!apiKey.trim()) return;

    saveApiKey(apiKey);

    alert("✅ API Key saved successfully.");

    onClose();
  };

  const handleRemove = () => {
    removeApiKey();

    setApiKey("");

    alert("API Key removed.");

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className="w-[92%] max-w-lg rounded-3xl p-6"
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
        }}
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiKey size={22} />
            <h2 className="text-xl font-semibold">
              Gemini API Settings
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-zinc-700/20"
          >
            <FiX />
          </button>
        </div>

        <p
          className="mb-4 text-sm"
          style={{
            color: "var(--text-secondary)",
          }}
        >
          Your API key stays only on this device and is never shared with anyone.
        </p>

        <input
          type="password"
          value={apiKey}
          onChange={(e) =>
            setApiKey(e.target.value)
          }
          placeholder="AIzaSy..."
          className="mb-5 w-full rounded-xl px-4 py-3 outline-none"
          style={{
            background: "var(--input)",
            border: "1px solid var(--border)",
            color: "var(--text)",
          }}
        />

        <div className="mb-5 flex gap-3">
          <button
            onClick={handleSave}
            className="flex-1 rounded-xl py-3 font-medium text-white"
            style={{
              background:
                "linear-gradient(135deg,#00F5FF,#2563EB)",
            }}
          >
            Save API Key
          </button>

          {hasCustomApiKey() && (
            <button
              onClick={handleRemove}
              className="rounded-xl bg-red-500 px-5 py-3 text-white transition hover:bg-red-600"
            >
              Remove
            </button>
          )}
        </div>

        <button
          onClick={() =>
            window.open(
              "https://aistudio.google.com/app/apikey",
              "_blank"
            )
          }
          className="flex w-full items-center justify-center gap-2 rounded-xl py-3 transition"
          style={{
            background: "var(--header)",
            border: "1px solid var(--border)",
          }}
        >
          <FiExternalLink />
          Get Free Gemini API Key
        </button>

        <div
          className="mt-5 rounded-xl p-4 text-sm"
          style={{
            background: "var(--header)",
            border: "1px solid var(--border)",
            color: "var(--text-secondary)",
          }}
        >
          <strong style={{ color: "var(--text)" }}>
            Tip
          </strong>

          <br />

          If the demo key reaches its daily limit, add your own free Gemini API key to continue chatting immediately.
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;