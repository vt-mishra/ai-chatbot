import { FiEdit2 } from "react-icons/fi";

import MessageBubble from "./MessageBubble";

function UserMessage({
  text,
  image,
  fileName,
  fileType,
  messageId,
  onEdit,
}) {
  return (
    <div className="group mb-6 flex justify-end">
      <div className="w-fit max-w-[92%] sm:max-w-[85%] md:max-w-3xl lg:max-w-4xl">

        <MessageBubble isUser={true}>

          {/* Uploaded Image */}

          {image && (
            <div className="mb-3 overflow-hidden rounded-xl">
              <img
                src={image}
                alt="uploaded"
                className="
                  w-full
                  max-h-80
                  rounded-xl
                  object-cover
                "
              />
            </div>
          )}

          {/* Uploaded File */}

          {fileName && (
            <div
              className="
                mb-3
                flex
                items-center
                gap-3
                rounded-xl
                bg-white/10
                p-3
              "
            >
              <span className="text-2xl">
                📄
              </span>

              <div className="min-w-0">

                <div className="truncate font-medium">
                  {fileName}
                </div>

                <div className="text-xs opacity-80">
                  {fileType}
                </div>

              </div>
            </div>
          )}

          {/* Message */}

          {text && (
            <p className="whitespace-pre-wrap wrap-break-word">
              {text}
            </p>
          )}

        </MessageBubble>

        {/* Edit Button */}

        <div
          className="
            mt-2
            flex
            justify-end
            opacity-0
            transition-all
            duration-200
            group-hover:opacity-100
          "
        >
          <button
            onClick={() => onEdit?.(messageId)}
            title="Edit Prompt"
            className="
              rounded-xl
              border
              p-2
              transition
              hover:scale-105
            "
            style={{
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          >
            <FiEdit2 size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}

export default UserMessage;