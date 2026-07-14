import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import CodeBlock from "../common/CodeBlock";
import MessageActions from "./MessageActions";
import MessageBubble from "./MessageBubble";

function AssistantMessage({
  text,
  image,
  prompt,
  type,
  messageId,
}) {
  return (
    <div className="group mb-6 flex justify-start">
      <div className="w-fit max-w-[92%] sm:max-w-[85%] md:max-w-3xl lg:max-w-4xl">

        <MessageBubble isUser={false}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              img({ src, alt }) {
                return (
                  <img
                    src={src}
                    alt={alt}
                    className="
                      my-3
                      w-full
                      rounded-xl
                      border
                    "
                    style={{
                      borderColor: "var(--border)",
                    }}
                  />
                );
              },

              code({
                inline,
                className,
                children,
                ...props
              }) {
                const match =
                  /language-(\w+)/.exec(
                    className || ""
                  );

                if (!inline && match) {
                  return (
                    <CodeBlock
                      language={match[1]}
                    >
                      {String(children).replace(
                        /\n$/,
                        ""
                      )}
                    </CodeBlock>
                  );
                }

                return (
                  <code
                    className="
                      rounded
                      px-1.5
                      py-0.5
                      text-sm
                    "
                    style={{
                      background:
                        "rgba(0,255,255,.12)",
                      color:
                        "var(--text)",
                    }}
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
            }}
          >
            {text}
          </ReactMarkdown>
        </MessageBubble>

        <MessageActions
          text={text}
          image={image}
          prompt={prompt}
          isImage={type === "image"}
          messageId={messageId}
        />

      </div>
    </div>
  );
}

export default AssistantMessage;