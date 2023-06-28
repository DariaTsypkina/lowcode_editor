import { type HTMLAttributes } from "react";

import { StyledCreateContextMenu } from "./CreateContextMenu.styles";

type MouseEventHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

interface CreateContextMenuProps extends HTMLAttributes<HTMLDivElement> {
  isOpened: boolean;
  onEnd?: MouseEventHandler;
  onStart?: MouseEventHandler;
  onScript?: MouseEventHandler;
  onMessage?: MouseEventHandler;
  onCondition?: MouseEventHandler;
  onCustomInput?: MouseEventHandler;
}

export const CreateContextMenu = (props: CreateContextMenuProps) => {
  const { isOpened, onEnd, onStart, onScript, onMessage, onCondition, onCustomInput, ...otherProps } = props;

  if (!isOpened) {
    return null;
  }

  return (
    <StyledCreateContextMenu {...otherProps}>
      <ul>
        <li>
          <button data-nodetype="initialNode" onClick={onStart}>
            start
          </button>
        </li>
        <li>
          <button onClick={onMessage}>message</button>
        </li>
        <li>
          <button data-nodetype="customInput" onClick={onCustomInput}>
            custom input
          </button>
        </li>
        <li>
          <button onClick={onCondition}>condition</button>
        </li>
        <li>
          <button onClick={onScript}>script</button>
        </li>
        <li>
          <button onClick={onEnd}>end</button>
        </li>
      </ul>
    </StyledCreateContextMenu>
  );
};
