import { FiMoon, FiSun } from "react-icons/fi";
import useTheme from "../../hooks/useTheme";

function ThemeToggle() {
  const { dark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        flex
        w-full
        items-center
        justify-between
        rounded-lg
        p-3
        hover:bg-zinc-800
      "
    >
      <div className="flex items-center gap-3">
        {dark ? <FiMoon /> : <FiSun />}
        <span>Theme</span>
      </div>

      <span className="text-sm text-zinc-400">
        {dark ? "Dark" : "Light"}
      </span>
    </button>
  );
}

export default ThemeToggle;