import {
  FiSearch,
  FiChevronUp,
  FiChevronDown,
  FiX,
} from "react-icons/fi";

function ConversationSearch({
  open,
  query,
  setQuery,
  current,
  total,
  onNext,
  onPrev,
  onClose,
}) {
  if (!open) return null;

  return (
    <div className="absolute top-4 right-6 z-50 flex items-center gap-2 rounded-xl bg-zinc-800 p-2 shadow-xl">

      <FiSearch />

      <input
        autoFocus
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        placeholder="Search conversation..."
        className="w-60 bg-transparent outline-none"
      />

      <span className="text-sm text-zinc-400">

        {total === 0
          ? "0"
          : `${current + 1}/${total}`}

      </span>

      <button onClick={onPrev}>
        <FiChevronUp />
      </button>

      <button onClick={onNext}>
        <FiChevronDown />
      </button>

      <button onClick={onClose}>
        <FiX />
      </button>

    </div>
  );
}

export default ConversationSearch;