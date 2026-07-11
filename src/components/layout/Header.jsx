function Header() {
  return (
    <header
      className="flex h-16 items-center px-6 transition-colors duration-300"
      style={{
        background: "var(--header)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <h2
        className="text-lg font-semibold"
        style={{
          color: "var(--text)",
        }}
      >
        Gemini Chatbot
      </h2>
    </header>
  );
}

export default Header;