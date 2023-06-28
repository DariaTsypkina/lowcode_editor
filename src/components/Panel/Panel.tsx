import { useCallback, useState } from "react";

import { Button } from "../Button/Button";
import { CreateContextMenu } from "../CreateContextMenu/CreateContextMenu";
import { StyledButtons, StyledPanel } from "./Panel.styles";
import { mdiPlus, mdiTrayArrowDown } from "@mdi/js";
import Icon from "@mdi/react";
import { type Node, type ReactFlowJsonObject, useReactFlow } from "reactflow";

export const Panel = () => {
  const [isCreateContextMenuOpened, setIsCreateContextMenuOpened] = useState(false);

  const { setNodes, setEdges, setViewport, toObject, getNodes } = useReactFlow();

  const handleAddNode = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const { nodetype } = e.currentTarget.dataset;

      const nodes = getNodes();

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

      setIsCreateContextMenuOpened(false);
    },
    [getNodes, setNodes]
  );

  const onSave = useCallback(() => {
    const flow = toObject();
    localStorage.setItem("react-flow-example", JSON.stringify(flow));
    console.log(flow);
  }, [toObject]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow: ReactFlowJsonObject = JSON.parse(localStorage.getItem("react-flow-example") ?? "");

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow().catch(console.error);
  }, [setEdges, setNodes, setViewport]);

  return (
    <StyledPanel position="top-right">
      <StyledButtons>
        <Button
          onClick={() => {
            setIsCreateContextMenuOpened(true);
          }}
        >
          <Icon path={mdiPlus} size={1} />
        </Button>
        <Button onClick={onSave}>
          <Icon path={mdiTrayArrowDown} size={1} />
        </Button>

        <Button onClick={onRestore}>Restore</Button>
      </StyledButtons>

      <CreateContextMenu
        isOpened={isCreateContextMenuOpened}
        onStart={handleAddNode}
        onCustomInput={handleAddNode}
        onMouseLeave={() => {
          setIsCreateContextMenuOpened(false);
        }}
      />
    </StyledPanel>
  );
};
