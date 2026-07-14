import { FiMessageSquare } from "react-icons/fi";

function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">

      <div
        className="flex h-20 w-20 items-center justify-center rounded-3xl"
        style={{
          background:
            "linear-gradient(135deg,#00F5FF,#8B5CF6)",
          boxShadow:
            "0 0 35px rgba(0,245,255,.35)",
        }}
      >
        <FiMessageSquare size={34} color="#fff" />
      </div>

      <h1
        className="mt-8 text-3xl font-bold md:text-5xl"
        style={{
          color: "var(--text)",
        }}
      >
        How can I help you today?
      </h1>

      <p
        className="mt-4 max-w-xl text-sm leading-7 md:text-base"
        style={{
          color: "var(--text-secondary)",
        }}
      >
        Ask anything. I'm powered by{" "}
        <span
          style={{
            color: "#00F5FF",
            fontWeight: 600,
          }}
        >
          Gemini AI
        </span>
        .
      </p>

      <p
        className="mt-2 text-sm"
        style={{
          color: "var(--text-secondary)",
        }}
      >
        Designed & Developed by{" "}
        <span
          style={{
            background:
              "linear-gradient(90deg,#00F5FF,#8B5CF6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 700,
          }}
        >
          Vatan Mishra
        </span>
      </p>
    </div>
  );
}

export default EmptyState;  