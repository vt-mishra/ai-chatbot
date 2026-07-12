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
  return (
    <Menu
      transition
      menuButton={
        <MenuButton className="chat-menu-button">
          <FiMoreVertical size={18} />
        </MenuButton>
      }
    >
      <MenuItem
        className="chat-menu-item rename-item"
        onClick={onRename}
      >
        <FiEdit2 />
        <span>Rename</span>
      </MenuItem>

      <MenuItem
        className="chat-menu-item pin-item"
        onClick={onTogglePin}
      >
        <LuPin />
        <span>{pinned ? "Unpin Chat" : "Pin Chat"}</span>
      </MenuItem>

      <MenuItem
        className="chat-menu-item delete-item"
        onClick={onDelete}
      >
        <FiTrash2 />
        <span>Delete</span>
      </MenuItem>
    </Menu>
  );
}

export default ChatMenu;