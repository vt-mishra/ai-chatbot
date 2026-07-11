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

function ChatMenu({
  onRename,
  onDelete,
}) {
  return (
    <Menu
      menuButton={
        <MenuButton className="p-2 rounded-lg hover:bg-zinc-700 text-zinc-400">
          <FiMoreVertical />
        </MenuButton>
      }
      transition
    >
      <MenuItem onClick={onRename}>
        <FiEdit2 className="mr-2" />
        Rename
      </MenuItem>

      <MenuItem onClick={onDelete}>
        <FiTrash2 className="mr-2 text-red-500" />
        Delete
      </MenuItem>
    </Menu>
  );
}

export default ChatMenu;