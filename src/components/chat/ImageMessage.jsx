import MessageActions from "./MessageActions";

function ImageMessage({
  image,
  prompt,
  messageId,
}) {
  return (
    <div className="group mb-6 flex justify-start">
      <div className="w-fit max-w-[92%] sm:max-w-[80%] lg:max-w-xl">

        <img
          src={image}
          alt={prompt}
          onClick={() =>
            window.open(image, "_blank")
          }
          className="
            w-full
            cursor-pointer
            rounded-2xl
            border
            transition
            hover:opacity-90
          "
          style={{
            borderColor:
              "var(--border)",
          }}
        />

        <p
          className="mt-3 text-sm"
          style={{
            color:
              "var(--text-secondary)",
          }}
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

export default ImageMessage;