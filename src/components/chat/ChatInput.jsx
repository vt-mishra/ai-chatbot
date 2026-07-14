import { useEffect, useRef, useState } from "react";
import {
  FiSend,
  FiSquare,
  FiX,
  FiPlus,
  FiImage,
  FiFileText,
  FiMic,
  FiMicOff,
  FiVolume2,
  FiVolumeX,
} from "react-icons/fi";
import { Menu } from "@headlessui/react";
import { useChatContext } from "../../context/ChatContext";
import ImagePreview from "./ImagePreview";
import FilePreview from "./FilePreview";
import { stopSpeaking } from "../../utils/speech";

function ChatInput() {
  const {
    sendMessage,
    loading,
    streaming,
    stopGeneration,

    editingMessageId,
    editingText,
    setEditingText,
    cancelEditing,

    saveEditedMessage,
   voiceEnabled,
  setVoiceEnabled,
  } = useChatContext();

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
const [listening, setListening] = useState(false);

const recognitionRef = useRef(null);
  const fileInputRef = useRef(null);
const [mode, setMode] = useState("chat");


useEffect(() => {
  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.log("Speech Recognition not supported");
    return;
  }

  const recognition = new SpeechRecognition();

recognition.lang = "hi-IN";

recognition.continuous = false;
recognition.interimResults = true;
recognition.maxAlternatives = 1;


  recognition.onstart = () => {
    setListening(true);
  };

  recognition.onend = () => {
    setListening(false);
  };

  recognition.onerror = () => {
    setListening(false);
  };

recognition.onresult = (event) => {
  let transcript = "";

  for (let i = event.resultIndex; i < event.results.length; i++) {
    transcript += event.results[i][0].transcript;
  }

  setText(transcript.trim());
};

recognition.onend = () => {
  setListening(false);
};

  recognitionRef.current = recognition;
}, []);

const toggleListening = () => {
  if (!recognitionRef.current) return;

  if (listening) {
    recognitionRef.current.stop();
  } else {
    recognitionRef.current.start();
  }
};

  useEffect(() => {
    if (editingMessageId) {
      setText(editingText);
    }
  }, [editingMessageId, editingText]);

const handleSend = () => {
  if (
    (!text.trim() && !image && !file) ||
    loading ||
    streaming
  )
    return;

  if (editingMessageId) {
    saveEditedMessage(text);
    return;
  }

  sendMessage(text, image, file, mode);

  setText("");
  setImage(null);
  setFile(null);
  setMode("chat");

  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
};

  // ===========================
  // Drag & Drop
  // ===========================

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (!file) return;

if (file.type.startsWith("image/")) {
    setImage(file);
    setFile(null);
} else {
    setFile(file);
    setImage(null);
}
  };

  const handleFileSelect = (e) => {
  const selected = e.target.files?.[0];

  if (!selected) return;

  if (selected.type.startsWith("image/")) {
    setImage(selected);
    setFile(null);
  } else {
    setFile(selected);
    setImage(null);
  }
};

  return (
   <div
 className={`relative rounded-t-2xl p-3 sm:p-5 transition-all ${
    dragging ? "ring-2 ring-blue-500" : ""
  }`}
  style={{
    background: "var(--header)",
    border: "1px solid var(--border)",
  }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {dragging && (
        <div className="absolute inset-0 z-50 flex items-center justify-center rounded-2xl border-2 border-dashed border-blue-500"
style={{
  background: "rgba(0,0,0,.55)",
}}>
          <div className="text-center">
            <FiImage
              size={52}
              className="mx-auto mb-3 text-blue-400"
            />

            <p className="text-xl font-semibold text-white">
              Drop image here
            </p>

            <p className="text-sm text-zinc-400">
              PNG • JPG • WEBP
            </p>
          </div>
        </div>
      )}

      {editingMessageId && (
        <div className="mb-2 flex items-center justify-between rounded-lg px-4 py-2 text-sm"
style={{
  background: "var(--card)",
  color: "var(--text)",
  border: "1px solid var(--border)",
}}>
          <span>Editing message</span>

          <button
            onClick={() => {
              cancelEditing();
              setText("");
            }}
            className="rounded p-1 hover:bg-zinc-700"
          >
            <FiX />
          </button>
        </div>
      )}

      <ImagePreview
        file={image}
        onRemove={() => {
          setImage(null);

          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }}
      />

     <FilePreview
    file={file}
    onRemove={() => {
        setFile(null);

        if (fileInputRef.current)
            fileInputRef.current.value = "";
    }}
/>

<div className="mb-3 flex flex-wrap gap-2">
  <button
    onClick={() => setMode("chat")}
    className={`rounded-full px-4 py-2 text-sm transition ${
    mode === "chat"
? "bg-blue-600 text-white"
: ""
    }`}
    style={
  mode !== "chat"
    ? {
        background: "var(--card)",
        color: "var(--text)",
        border: "1px solid var(--border)",
      }
    : {}
}
  >
    💬 Chat
  </button>

  <button
    onClick={() => setMode("image")}
    className={`rounded-full px-4 py-2 text-sm transition ${
      mode === "image"
        ? "bg-purple-600 text-white"
        : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
    }`}
  >
    🎨 Image
  </button>
</div>
      <div
  className="
flex
items-center
gap-1
rounded-2xl
p-2
sm:gap-2
"
  style={{
    background: "var(--card)",
    border: "1px solid var(--border)",
  }}
>
        <input
          type="file"
          hidden
          ref={fileInputRef}
          accept="
image/*,
application/pdf,
application/msword,
application/vnd.openxmlformats-officedocument.wordprocessingml.document,
text/plain,
text/csv
"
          onChange={(e) => {
          const selected = e.target.files?.[0];

if (!selected) return;

if (selected.type.startsWith("image/")) {
  setImage(selected);
  setFile(null);
} else {
  setFile(selected);
  setImage(null);
}
          }}
        />
{mode === "chat" && (
        <Menu as="div" className="relative mr-2">

<Menu.Button
  className="
    rounded-xl
    p-3
    transition-all
    duration-300
  "
  style={{
    background: "rgba(255,255,255,.03)",
    border: "1px solid rgba(0,245,255,.12)",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background =
      "linear-gradient(135deg,#00F5FF22,#8B5CF622)";
    e.currentTarget.style.boxShadow =
      "0 0 18px rgba(0,245,255,.25)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background =
      "rgba(255,255,255,.03)";
    e.currentTarget.style.boxShadow = "none";
  }}
>
  <FiPlus size={20} />
</Menu.Button>

<Menu.Items
  className="
    absolute
    bottom-14
    left-0
    z-50
   w-52 
   sm:w-60
    overflow-hidden
    rounded-2xl
    border
    p-2
    backdrop-blur-xl
    animate-in
    fade-in
    zoom-in-95
  "
  style={{
    background: "rgba(20,24,38,.92)",
    borderColor: "rgba(0,245,255,.15)",
    boxShadow:
      "0 12px 35px rgba(0,0,0,.45),0 0 18px rgba(0,245,255,.08)",
  }}
>

<Menu.Item>
  {({ active }) => (
    <button
      onClick={() => {
        fileInputRef.current.accept = "image/*";
        fileInputRef.current.click();
      }}
      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 transition"
      style={{
        background: active
          ? "linear-gradient(135deg,rgba(0,245,255,.15),rgba(139,92,246,.15))"
          : "transparent",
        color: active ? "#00F5FF" : "#E5E7EB",
      }}
    >
      <FiImage size={18} />
      Upload Image
    </button>
  )}
</Menu.Item>

  <Menu.Item>
  {({ active }) => (
    <button
      onClick={() => {
        fileInputRef.current.accept =
          ".pdf,.doc,.docx,.txt,.csv";
        fileInputRef.current.click();
      }}
      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 transition whitespace-nowrap"
      style={{
        background: active
          ? "linear-gradient(135deg,rgba(0,245,255,.15),rgba(139,92,246,.15))"
          : "transparent",
        color: active ? "#00F5FF" : "#E5E7EB",
      }}
    >
      <FiFileText size={18} />
      Upload Document
    </button>
  )}
</Menu.Item>

  </Menu.Items>

</Menu>
)}
        <input
          type="text"
          value={text}
          disabled={loading || streaming}
          placeholder={
            editingMessageId
              ? "Edit your message..."
              : loading
              ? "Gemini is thinking..."
              : streaming
              ? "Gemini is typing..."
              : mode === "image"
? "Describe the image you want..."
: "Message AI..."
          }
          onChange={(e) => {
            if (editingMessageId) {
              setEditingText(e.target.value);
            }

            setText(e.target.value);
          }}
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !e.shiftKey &&
              !(loading || streaming)
            ) {
              e.preventDefault();
              handleSend();
            }
          }}
          className="
flex-1
min-w-0
bg-transparent
px-2
sm:px-3
py-2
text-sm
sm:text-base
outline-none
disabled:opacity-60
"
style={{
  color: "var(--text)",
}}
        />
<button
  onClick={toggleListening}
  title={listening ? "Stop Listening" : "Voice Input"}
  className="
relative
rounded-xl
p-2
sm:p-3
transition-all
duration-300
"
  style={{
    background: listening
      ? "linear-gradient(135deg,#ef4444,#dc2626)"
      : "linear-gradient(135deg, rgb(0, 245, 255), rgb(139, 92, 246))",
    color: "#fff",
    border: listening
      ? "none"
      : "1px solid rgba(0,245,255,.15)",
    boxShadow: listening
      ? "0 0 20px rgba(239,68,68,.45)"
      : "0 0 12px rgba(0,245,255,.08)",
  }}
>
  {listening && (
    <span className="absolute inset-0 rounded-xl animate-ping bg-red-500 opacity-30" />
  )}

  {listening ? (
    <FiMicOff className="relative z-10" size={18} />
  ) : (
    <FiMic className="relative z-10" size={18} />
  )}
</button>
<button
  onClick={() => setVoiceEnabled(!voiceEnabled)}
  title="Voice Replies"
  className="
rounded-xl
p-2
sm:p-3
transition-all
duration-300
"
  style={{
    background: voiceEnabled
      ? "linear-gradient(135deg,#00F5FF,#8B5CF6)"
      : "linear-gradient(135deg, rgb(0, 245, 255), rgb(139, 92, 246))",
    color: "#fff",
    border: voiceEnabled
      ? "none"
      : "1px solid rgba(0,245,255,.15)",
    boxShadow: voiceEnabled
      ? "0 0 18px rgba(0,245,255,.35)"
      : "0 0 12px rgba(0,245,255,.08)",
  }}
>
  {voiceEnabled ? (
    <FiVolume2 size={18} />
  ) : (
    <FiVolumeX size={18} />
  )}
</button>
        {loading || streaming ? (
         <button
  onClick={() => {
    stopGeneration();
    stopSpeaking();
  }}
  title="Stop generating"
  className="rounded-xl
p-2
sm:p-3
transition-all
duration-300transition-all duration-300 hover:scale-105"
  style={{
    background: "linear-gradient(135deg,#ef4444,#dc2626)",
    color: "#fff",
    boxShadow: "0 0 18px rgba(239,68,68,.35)",
  }}
>
  <FiSquare size={18} />
</button>
        ) : (
          <button
  onClick={handleSend}
  disabled={!text.trim() && !image && !file}
  className="rounded-xl
p-2
sm:p-3
transition-all
duration-300 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
  style={{
    background:
      mode === "image"
        ? "linear-gradient(135deg,#8B5CF6,#EC4899)"
        : "linear-gradient(135deg,#00F5FF,#2563EB)",
    color: "#fff",
    boxShadow:
      mode === "image"
        ? "0 0 20px rgba(139,92,246,.45)"
        : "0 0 20px rgba(0,245,255,.35)",
  }}
>
  <FiSend size={18} />
</button>
        )}
      </div>
    </div>
  );
}

export default ChatInput;