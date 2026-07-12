import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FiEdit2 } from "react-icons/fi";

import CodeBlock from "../common/CodeBlock";
import MessageActions from "./MessageActions";
import React from "react";

function Message({
  role,
  text,
  image,
  fileName,
  fileType,
  type,
  prompt,
  messageId,
  onEdit,
}) {
  const isUser = role === "user";

  const bubbleStyle = {
  background: isUser ? "var(--user)" : "var(--assistant)",
  color: isUser ? "#fff" : "var(--text)",
  border: isUser ? "none" : "1px solid var(--border)",
  boxShadow: "0 8px 24px rgba(0,0,0,.08)",
};

const actionStyle = {
  color: "var(--text)",
  border: "1px solid var(--border)",
  background: "transparent",
};
  // ==========================
  // AI Image Message
  // ==========================
  if (!isUser && type === "image") {
    return (
      <div className="group mb-6 flex justify-start">
        <div className="max-w-4xl">
      <img
  src={image}
  alt={prompt}
  onClick={() => window.open(image, "_blank")}
  className="max-w-xl cursor-pointer rounded-2xl border transition hover:opacity-90"
style={bubbleStyle}
/>

         <p
  className="mt-2 text-sm"
  style={bubbleStyle}
>
            {prompt}
          </p>

          <MessageActions
            image={image}
            prompt={prompt}
            isImage={true}
            messageId={messageId}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group mb-6 flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div className="max-w-4xl">
     <div
  className="rounded-2xl px-5 py-4 shadow-sm transition-colors duration-300"
style={bubbleStyle}
>
          {isUser ? (
            <>
              {image && (
                <div className="mb-3 overflow-hidden rounded-xl">
             <img
  src={image}
  alt="uploaded"
  className="max-h-80 w-full rounded-xl border object-cover"
style={bubbleStyle}
/>
                </div>
              )}
{fileName && (
   <div
  className="mb-3 rounded-xl p-3"
style={bubbleStyle}
>
        📄 {fileName}
    </div>
)}
{fileName && (
<div
  className="mb-3 flex items-center gap-3 rounded-xl p-3"
style={bubbleStyle}
>
    <span className="text-2xl">📄</span>

    <div>
      <div className="font-medium">{fileName}</div>
   <div
  className="text-xs"
style={bubbleStyle}
>
        {fileType}
      </div>
    </div>
  </div>
)}
              {text && (
                <p className="whitespace-pre-wrap wrap-break- word">
                  {text}
                </p>
              )}
            </>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                img({ src, alt }) {
                  return (
                 <img
  src={src}
  alt={alt}
  className="my-3 max-h-96 rounded-xl border"
style={bubbleStyle}
/>
                  );
                },

                code({ className, children }) {
                  const match = /language-(\w+)/.exec(
                    className || ""
                  );

                  if (match) {
                    return (
                      <CodeBlock language={match[1]}>
                        {String(children).replace(/\n$/, "")}
                      </CodeBlock>
                    );
                  }

                  return (
                   <code
  className="rounded px-1 py-0.5"
style={bubbleStyle}
>
  {children}
</code>
                  );
                },
              }}
            >
              {text}
            </ReactMarkdown>
          )}
        </div>

        {isUser ? (
          <div className="mt-2 flex justify-end opacity-0 transition-all duration-200 group-hover:opacity-100">
          <button
  onClick={() => onEdit?.(messageId)}
  title="Edit Prompt"
 className="rounded-lg p-2 transition hover:opacity-80"
style={bubbleStyle}
  onMouseEnter={(e) => {
    e.currentTarget.style.background =
      "var(--card)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background =
      "transparent";
  }}
>
             <FiEdit2
  size={16}
style={actionStyle}
/>
            </button>
          </div>
        ) : (
          <MessageActions
            text={text}
            image={image}
            prompt={prompt}
            isImage={type === "image"}
            messageId={messageId}
          />
        )}
      </div>
    </div>
  );
}
export default React.memo(Message);