function TypingIndicator() {
  return (
    <div className="flex justify-start mb-6">
      <div className="bg-zinc-800 rounded-2xl px-4 py-3 text-zinc-300 flex items-center gap-1">
        <span className="animate-bounce">•</span>
        <span
          className="animate-bounce"
          style={{ animationDelay: "0.2s" }}
        >
          •
        </span>
        <span
          className="animate-bounce"
          style={{ animationDelay: "0.4s" }}
        >
          •
        </span>
      </div>
    </div>
  );
}

export default TypingIndicator;