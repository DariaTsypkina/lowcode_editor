import { type HTMLAttributes, useCallback } from "react";

import { StyledCreateContextMenu } from "./CreateContextMenu.styles";
import { type Node, useNodes, useReactFlow } from "reactflow";

interface CreateContextMenuProps extends HTMLAttributes<HTMLDivElement> {
  isOpened: boolean;
}

export const CreateContextMenu = (props: CreateContextMenuProps) => {
  const { isOpened, ...otherProps } = props;

  const { setNodes } = useReactFlow();
  const nodes = useNodes();

  const handleAddNode = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const { nodetype } = e.currentTarget.dataset;

      if (nodes.some(({ type }) => type === "initialNode") && nodetype === "initiaNode") {
        return;
      }

      const lastNode = nodes[nodes.length - 1];
      const lastId = lastNode?.id || "0";
      const id = `${+lastId + 1}`;

      const newNode: Node = {
        id,
        position: {
          x: id === "1" ? 500 : lastNode?.position.x,
          y: id === "1" ? 150 : lastNode?.position.y + 150
        },
        data: {
          value: nodetype === "initialNode" ? "Initial Node" : ""
        },
        type: nodetype
      };

      setNodes((state) => [...state, newNode]);
    },
    [nodes, setNodes]
  );

  if (!isOpened) {
    return null;
  }

  return (
    <StyledCreateContextMenu {...otherProps}>
      <ul>
        <li>
          <button data-nodetype="initialNode" onClick={handleAddNode}>
            start
          </button>
        </li>
        <li>
          <button onClick={handleAddNode}>message</button>
        </li>
        <li>
          <button data-nodetype="customInput" onClick={handleAddNode}>
            custom input
          </button>
        </li>
        <li>
          <button onClick={handleAddNode}>condition</button>
        </li>
        <li>
          <button onClick={handleAddNode}>script</button>
        </li>
        <li>
          <button onClick={handleAddNode}>end</button>
        </li>
      </ul>
    </StyledCreateContextMenu>
  );
};
