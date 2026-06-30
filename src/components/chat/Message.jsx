import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "../common/CodeBlock";

function Message({ role, text }) {
  const isUser = role === "user";

  return (
    <div className={`flex mb-6 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-4xl rounded-2xl px-5 py-4 ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-zinc-800 text-white"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{text}</p>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ className, children }) {
                const match = /language-(\w+)/.exec(className || "");

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
    </div>
  );
}

export default Message;