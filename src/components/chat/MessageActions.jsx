import {
  FiCopy,
  FiCheck,
  FiRefreshCw,
  FiDownload,
} from "react-icons/fi";

import { useState } from "react";
import { useChatContext } from "../../context/ChatContext";
import toast from "react-hot-toast";
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

  const showCopied = () => {
    setCopied(true);
toast.success("Copied to clipboard");
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleCopy = async () => {
    if (!text) return;

    await navigator.clipboard.writeText(text);

    showCopied();
  };

  const copyPrompt = async () => {
    if (!prompt) return;

    await navigator.clipboard.writeText(prompt);

    showCopied();
  };

  const downloadImage = () => {
    if (!image) return;

    const a = document.createElement("a");

    a.href = image;
    a.download = "generated-image.png";

    document.body.appendChild(a);
    a.click();
    a.remove();
    toast.success("Image downloaded");
  };

  const buttonStyle = {
    color: "var(--text)",
  };

  const hoverIn = (e) => {
    e.currentTarget.style.background = "var(--card)";
  };

  const hoverOut = (e) => {
    e.currentTarget.style.background = "transparent";
  };

  return (
    <div className="mt-2 flex items-center gap-2 opacity-0 transition-all duration-200 group-hover:opacity-100">
      {isImage ? (
        <>
          <button
            onClick={downloadImage}
            className="rounded-lg px-3 py-2 transition"
            style={buttonStyle}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
          >
            <FiDownload className="inline mr-2" />
            Download
          </button>

          <button
            onClick={copyPrompt}
            className="rounded-lg px-3 py-2 transition"
            style={buttonStyle}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
          >
            {copied ? (
              <FiCheck className="inline mr-2" />
            ) : (
              <FiCopy className="inline mr-2" />
            )}

            Copy Prompt
          </button>

          <button
            onClick={() =>
              regenerateResponse(messageId)
            }
            disabled={streaming}
            className="rounded-lg p-2 transition disabled:opacity-50"
            style={buttonStyle}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
            title="Regenerate"
          >
            <FiRefreshCw />
          </button>
        </>
      ) : (
        <>
          <button
            onClick={handleCopy}
            className="rounded-lg p-2 transition"
            style={buttonStyle}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
            title="Copy"
          >
            {copied ? <FiCheck /> : <FiCopy />}
          </button>

          <button
            onClick={() =>
              regenerateResponse(messageId)
            }
            disabled={streaming}
            className="rounded-lg p-2 transition disabled:opacity-50"
            style={buttonStyle}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
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