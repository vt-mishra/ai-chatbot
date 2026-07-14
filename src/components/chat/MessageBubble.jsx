function MessageBubble({
  isUser,
  children,
}) {
  return (
    <div
      className="
        rounded-2xl
        px-4
        py-3
        sm:px-5
        sm:py-4
        transition-all
        duration-300
      "
      style={{
        background: isUser
          ? "var(--user)"
          : "var(--assistant)",

        color: isUser
          ? "#fff"
          : "var(--text)",

        border: isUser
          ? "none"
          : "1px solid var(--border)",

        boxShadow:
          "0 8px 24px rgba(0,0,0,.08)",
      }}
    >
      {children}
    </div>
  );
}

export default MessageBubble;