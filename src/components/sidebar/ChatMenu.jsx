import {
  Menu,
  MenuButton,
  MenuItem,
} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";

import {
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import { LuPin } from "react-icons/lu";

function ChatMenu({
  onRename,
  onDelete,
  onTogglePin,
  pinned,
}) {
  const menuStyle = {
    background: "var(--card)",
    color: "var(--text)",
    border: "1px solid var(--border)",
    borderRadius: "16px",
    overflow: "hidden",
    minWidth: "190px",
    padding: "6px",
    boxShadow:
      "0 12px 35px rgba(0,255,255,.12)",
    zIndex: 9999,
  };
  const itemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 14px",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all .2s ease",
    color: "var(--text)",
  };

  const hover = (e) => {
    e.currentTarget.style.background =
      "linear-gradient(135deg,#00F5FF22,#8B5CF622)";
    e.currentTarget.style.boxShadow =
      "0 0 15px rgba(0,255,255,.18)";
    e.currentTarget.style.transform =
      "translateX(2px)";
  };

  const leave = (e) => {
    e.currentTarget.style.background =
      "transparent";
    e.currentTarget.style.boxShadow = "none";
    e.currentTarget.style.transform =
      "translateX(0)";
  };

  return (
    <Menu
      transition
      align="end"
      direction="bottom"
      arrow={false}
      menuStyle={menuStyle}
      menuButton={
        <MenuButton
          className="rounded-lg p-2 transition"
          style={{
            color: "var(--text-secondary)",
            background: "transparent",
            border: "none",
          }}
        >
          <FiMoreVertical size={18} />
        </MenuButton>
      }
    >
      <MenuItem
        onClick={onRename}
        style={itemStyle}
        onMouseEnter={hover}
        onMouseLeave={leave}
      >
        <FiEdit2 size={16} />
        <span>Rename</span>
      </MenuItem>

      <MenuItem
        onClick={onTogglePin}
        style={itemStyle}
        onMouseEnter={hover}
        onMouseLeave={leave}
      >
        <LuPin
          size={16}
          color={
            pinned
              ? "#facc15"
              : "currentColor"
          }
        />

        <span>
          {pinned
            ? "Unpin Chat"
            : "Pin Chat"}
        </span>
      </MenuItem>

      <MenuItem
        onClick={onDelete}
        style={{
          ...itemStyle,
          color: "#ef4444",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background =
            "rgba(239,68,68,.12)";
          e.currentTarget.style.transform =
            "translateX(2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background =
            "transparent";
          e.currentTarget.style.transform =
            "translateX(0)";
        }}
      >
        <FiTrash2 size={16} />
        <span>Delete</span>
      </MenuItem>
    </Menu>
  );
}

export default ChatMenu;