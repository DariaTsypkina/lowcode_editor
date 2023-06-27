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
  const { isOpened } = props;

  if (!isOpened) {
    return null;
  }

  return (
    <StyledCreateContextMenu>
      <ul>
        <li>
          <button data-nodetype="initialNode" onClick={props.onStart}>
            start
          </button>
        </li>
        <li>
          <button onClick={props.onMessage}>message</button>
        </li>
        <li>
          <button data-nodetype="customInput" onClick={props.onCustomInput}>
            custom input
          </button>
        </li>
        <li>
          <button onClick={props.onCondition}>condition</button>
        </li>
        <li>
          <button onClick={props.onScript}>script</button>
        </li>
        <li>
          <button onClick={props.onEnd}>end</button>
        </li>
      </ul>
    </StyledCreateContextMenu>
  );
};
