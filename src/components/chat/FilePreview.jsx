import {
    FiFile,
    FiFileText,
    FiFilePlus,
    FiX,
} from "react-icons/fi";

function FilePreview({
    file,
    onRemove,
}) {
    if (!file) return null;

    const getIcon = () => {
        if (
            file.type ===
                "application/pdf" ||
            file.name.endsWith(".pdf")
        )
            return <FiFileText size={20} />;

        if (
            file.name.endsWith(".doc") ||
            file.name.endsWith(".docx")
        )
            return <FiFilePlus size={20} />;

        return <FiFile size={20} />;
    };

    return (
        <div className="mb-3 flex items-center justify-between rounded-xl bg-zinc-800 px-4 py-3">
            <div className="flex items-center gap-3">
                {getIcon()}

                <div>
                    <p className="text-sm text-white">
                        {file.name}
                    </p>

                    <p className="text-xs text-zinc-400">
                        {(file.size / 1024).toFixed(
                            1
                        )}{" "}
                        KB
                    </p>
                </div>
            </div>

            <button
                onClick={onRemove}
                className="rounded p-1 hover:bg-zinc-700"
            >
                <FiX />
            </button>
        </div>
    );
}

export default FilePreview;