import { FiMessageSquare } from "react-icons/fi";

function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">

      <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center">

        <FiMessageSquare size={28} />

      </div>

      <h1 className="text-4xl font-bold mt-6">
        How can I help you today?
      </h1>

      <p className="text-zinc-400 mt-3">
        Ask anything. I'm powered by Gemini AI.
      </p>

    </div>
  );
}

export default EmptyState;