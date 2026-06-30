import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function CodeBlock({ language, children }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-zinc-700">
      <div className="flex items-center justify-between bg-zinc-900 px-4 py-2">
        <span className="text-sm text-zinc-400">
          {language || "text"}
        </span>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white"
        >
          {copied ? <FiCheck /> : <FiCopy />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: 0,
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}

export default CodeBlock;