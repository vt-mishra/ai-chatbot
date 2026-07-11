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
            className="max-w-xl cursor-pointer rounded-2xl transition hover:opacity-90"
          />

          <p className="mt-2 text-sm text-zinc-400">
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
          className={`rounded-2xl px-5 py-4 shadow-sm ${
            isUser
              ? "bg-blue-600 text-white"
              : "bg-zinc-800 text-white"
          }`}
        >
          {isUser ? (
            <>
              {image && (
                <div className="mb-3 overflow-hidden rounded-xl">
                  <img
                    src={image}
                    alt="uploaded"
                    className="max-h-80 w-full rounded-xl object-cover"
                  />
                </div>
              )}
{fileName && (
    <div className="mb-3 rounded-xl bg-zinc-700 p-3">
        📄 {fileName}
    </div>
)}
{fileName && (
  <div className="mb-3 flex items-center gap-3 rounded-xl border border-zinc-600 bg-zinc-700 p-3">
    <span className="text-2xl">📄</span>

    <div>
      <div className="font-medium">{fileName}</div>
      <div className="text-xs text-zinc-300">
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
                      className="my-3 max-h-96 rounded-xl"
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
                    <code className="rounded bg-zinc-900 px-1 py-0.5">
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
              className="rounded-lg p-2 hover:bg-zinc-700"
              title="Edit Prompt"
            >
              <FiEdit2 size={16} />
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