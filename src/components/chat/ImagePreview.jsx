import { FiX } from "react-icons/fi";

function ImagePreview({ file, onRemove }) {
  if (!file) return null;

  const preview =
    typeof file === "string"
      ? file
      : URL.createObjectURL(file);

  return (
    <div className="relative mb-3 w-fit">
      <img
        src={preview}
        alt="preview"
        className="max-h-48 max-w-xs rounded-xl border border-zinc-700 object-cover"
        onLoad={() => {
          if (typeof file !== "string") {
            URL.revokeObjectURL(preview);
          }
        }}
      />

      <button
        onClick={onRemove}
        className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
      >
        <FiX />
      </button>
    </div>
  );
}

export default ImagePreview;