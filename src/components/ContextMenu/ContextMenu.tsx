import { type HTMLAttributes, useState } from "react";

import { CreateContextMenu } from "../CreateContextMenu/CreateContextMenu";
import { StyledContextMenu } from "./ContextMenu.styles";
import { createPortal } from "react-dom";

interface ContextMenuProps extends HTMLAttributes<HTMLDivElement> {
  isOpened: boolean;
  position: {
    x: number;
    y: number;
  };
}

export const ContextMenu = ({ isOpened, position, ...props }: ContextMenuProps) => {
  const [isCreateContextMenuOpened, setIsCreateContextMenuOpened] = useState(false);

  if (!isOpened) {
    return null;
  }

  return createPortal(
    <StyledContextMenu {...props} position={position}>
      <ul>
        <li>
          <button
            onClick={() => {
              setIsCreateContextMenuOpened(true);
            }}
          >
            create
          </button>
        </li>
        <li>
          <button>zoom in</button>
        </li>
        <li>
          <button>zoom out</button>
        </li>
        <li>
          <button>fit view</button>
        </li>
        <li>
          <button>show/hide working areas</button>
        </li>
        <li>
          <button>show grid</button>
        </li>
      </ul>

      <CreateContextMenu
        isOpened={isCreateContextMenuOpened}
        onMouseLeave={() => {
          setIsCreateContextMenuOpened(false);
        }}
      />
    </StyledContextMenu>,
    document.body
  );
};
