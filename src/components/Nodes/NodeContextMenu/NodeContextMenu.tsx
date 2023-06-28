import { type HTMLAttributes } from "react";

import { StyledButton, StyledContextMenu } from "./NodeContextMenu.styles";
import { mdiContentCopy, mdiLock, mdiPencil, mdiTrashCanOutline } from "@mdi/js";
import Icon from "@mdi/react";

interface NodeContextMenuProps extends HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const NodeContextMenu = (props: NodeContextMenuProps) => {
  const { selected } = props;

  return (
    <StyledContextMenu selected={!!selected}>
      <StyledButton>
        <Icon path={mdiContentCopy} size={0.5} />
      </StyledButton>
      <StyledButton onClick={props.onEdit}>
        <Icon path={mdiPencil} size={0.5} />
      </StyledButton>
      <StyledButton>
        <Icon path={mdiLock} size={0.5} />
      </StyledButton>
      <StyledButton onClick={props.onDelete}>
        <Icon path={mdiTrashCanOutline} size={0.5} />
      </StyledButton>
    </StyledContextMenu>
  );
};
