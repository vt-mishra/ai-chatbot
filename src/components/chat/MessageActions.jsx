import {
  FiCopy,
  FiCheck,
  FiRefreshCw,
  FiDownload,
  FiImage,
} from "react-icons/fi";

import { useState } from "react";
import { useChatContext } from "../../context/ChatContext";

function MessageActions({
  text,
  image,
  prompt,
  isImage,
  messageId,
}) {
  const [copied, setCopied] = useState(false);

  const { regenerateResponse, streaming } =
    useChatContext();

  const handleCopy = async () => {
    if (!text) return;

    await navigator.clipboard.writeText(text);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const downloadImage = () => {
    if (!image) return;

    const a = document.createElement("a");

    a.href = image;
    a.download = "generated-image.png";

    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const copyPrompt = async () => {
    if (!prompt) return;

    await navigator.clipboard.writeText(prompt);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="mt-2 flex items-center gap-2 opacity-0 transition group-hover:opacity-100">
      {isImage ? (
        <>
        {isImage && (
  <>
    <button
      onClick={downloadImage}
      className="p-2 rounded-lg hover:bg-zinc-700"
      title="Download"
    >
      Download
    </button>

    <button
      onClick={copyPrompt}
      className="p-2 rounded-lg hover:bg-zinc-700"
      title="Copy Prompt"
    >
      Copy Prompt
    </button>
  </>
)}

          <button
            onClick={() => regenerateResponse(messageId)}
            disabled={streaming}
            className="rounded-lg p-2 hover:bg-zinc-700 disabled:opacity-50"
            title="Regenerate"
          >
            <FiRefreshCw />
          </button>
        </>
      ) : (
        <>
          <button
            onClick={handleCopy}
            className="rounded-lg p-2 hover:bg-zinc-700"
            title="Copy"
          >
            {copied ? <FiCheck /> : <FiCopy />}
          </button>

          <button
            onClick={() => regenerateResponse(messageId)}
            disabled={streaming}
            className="rounded-lg p-2 hover:bg-zinc-700 disabled:opacity-50"
            title="Regenerate"
          >
            <FiRefreshCw />
          </button>
        </>
      )}
    </div>
  );
}

export default MessageActions;