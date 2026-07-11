import { useEffect, useRef, useState } from "react";
import {
  FiSend,
  FiSquare,
  FiX,
  FiPlus,
  FiImage,
  FiFileText,
  FiMic,
  FiMicOff
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

  recognition.lang = "en-IN";

  recognition.continuous = true;

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

    for (
      let i = event.resultIndex;
      i < event.results.length;
      i++
    ) {
      transcript += event.results[i][0].transcript;
    }

    setText(transcript);
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
      className={`relative rounded-2xl p-5 transition-all ${
        dragging
          ? "ring-2 ring-blue-500 bg-zinc-900"
          : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {dragging && (
        <div className="absolute inset-0 z-50 flex items-center justify-center rounded-2xl border-2 border-dashed border-blue-500 bg-black/70">
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
        <div className="mb-2 flex items-center justify-between rounded-lg bg-zinc-800 px-4 py-2 text-sm text-zinc-300">
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

<div className="mb-3 flex gap-2">
  <button
    onClick={() => setMode("chat")}
    className={`rounded-full px-4 py-2 text-sm transition ${
      mode === "chat"
        ? "bg-blue-600 text-white"
        : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
    }`}
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
      <div className="flex items-center rounded-2xl bg-zinc-800 p-2">
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
      rounded-full
      p-3
      text-white
      hover:bg-zinc-700
      transition
    "
  >
    <FiPlus size={20} />
  </Menu.Button>

  <Menu.Items
    className="
      absolute
      bottom-14
      left-0
      w-52
      rounded-xl
      bg-zinc-900
      shadow-xl
      border
      border-zinc-700
      overflow-hidden
      z-50
    "
  >

    <Menu.Item>
      {({ active }) => (
        <button
          onClick={() => {
            fileInputRef.current.accept = "image/*";
            fileInputRef.current.click();
          }}
          className={`flex w-full items-center gap-3 px-4 py-3 ${
            active ? "bg-zinc-800" : ""
          }`}
        >
          <FiImage />
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
          className={`flex w-full items-center gap-3 px-4 py-3 ${
            active ? "bg-zinc-800" : ""
          }`}
        >
          <FiFileText />
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
          className="flex-1 bg-transparent px-3 py-2 text-white outline-none placeholder:text-zinc-400 disabled:opacity-60"
        />
<button
  onClick={toggleListening}
  title={listening ? "Stop Listening" : "Voice Input"}
  className={`
      relative
      mr-2
      rounded-full
      p-3
      transition
      ${
        listening
          ? "bg-red-500 text-white"
          : "text-zinc-300 hover:bg-zinc-700"
      }
  `}
>
  {listening ? (
    <>
      <span className="absolute inset-0 animate-ping rounded-full bg-red-500 opacity-50"></span>
      <FiMicOff className="relative" size={18} />
    </>
  ) : (
    <FiMic size={18} />
  )}
</button>
<button
  onClick={() => setVoiceEnabled(!voiceEnabled)}
  className="rounded-full p-3 hover:bg-zinc-700"
>
  {voiceEnabled ? "🔊" : "🔇"}
</button>
        {loading || streaming ? (
          <button
            onClick={() => {
    stopGeneration();
    stopSpeaking();
}}
            title="Stop generating"
            className="rounded-full bg-red-500 p-3 text-white transition hover:bg-red-600 active:scale-95"
          >
            <FiSquare size={18} />
          </button>
        ) : (
          <button
            onClick={handleSend}
            disabled={
    !text.trim() &&
    !image &&
    !file
}
            className={`rounded-full p-3 transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 ${
  mode === "image"
    ? "bg-purple-600 text-white"
    : "bg-white text-black"
}`}
          >
            <FiSend size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

export default ChatInput;