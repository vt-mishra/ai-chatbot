import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

function CodeBlock({ language, children }) {
  const [copied, setCopied] = useState(false);

  const isDark =
    document.documentElement.classList.contains("dark");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div
      className="my-4 overflow-hidden rounded-xl transition-colors"
      style={{
        border: "1px solid var(--border)",
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{
          background: "var(--card)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <span
          className="text-sm"
          style={{
            color: "var(--text-secondary)",
          }}
        >
          {language || "text"}
        </span>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-lg px-2 py-1 transition"
          style={{
            color: "var(--text)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "var(--bg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "transparent";
          }}
        >
          {copied ? <FiCheck /> : <FiCopy />}

          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={isDark ? oneDark : oneLight}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          background: "transparent",
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}

export default CodeBlock;