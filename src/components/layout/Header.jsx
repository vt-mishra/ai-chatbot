import { FiMenu } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";

function Header({ onOpenSidebar }) {
  return (
    <header
      className="
        sticky
        top-0
        z-40
        flex
        h-16
        items-center
        justify-between
        px-3
        sm:px-5
        lg:px-6
        backdrop-blur-xl
        transition-all
        duration-300
      "
      style={{
        background: "color-mix(in srgb, var(--header) 92%, transparent)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile Menu */}

        <button
          onClick={onOpenSidebar}
          className="
            rounded-xl
            p-2
            transition
            md:hidden
            active:scale-95
          "
          style={{
            color: "var(--text)",
          }}
        >
          <FiMenu size={22} />
        </button>

        {/* Logo */}

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            shrink-0
          "
          style={{
            background:
              "linear-gradient(135deg,#00F5FF,#8B5CF6)",
            boxShadow:
              "0 0 25px rgba(0,245,255,.35)",
            color: "#fff",
          }}
        >
          <RiRobot2Line size={22} />
        </div>

        <div className="min-w-0">
          <h2
            className="
              truncate
              text-base
              font-semibold
              sm:text-lg
            "
            style={{
              color: "var(--text)",
            }}
          >
            V/S AI
          </h2>

          <p
            className="
              hidden
              text-xs
              sm:block
            "
            style={{
              color: "var(--text-secondary)",
            }}
          >
            Your Personal AI Assistant
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;