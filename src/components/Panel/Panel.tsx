import { useCallback, useState } from "react";

import { Button } from "../Button/Button";
import { CreateContextMenu } from "../CreateContextMenu/CreateContextMenu";
import { StyledButtons, StyledPanel } from "./Panel.styles";
import { mdiPlus, mdiTrayArrowDown } from "@mdi/js";
import Icon from "@mdi/react";
import { type ReactFlowJsonObject, useReactFlow } from "reactflow";

export const Panel = () => {
  const [isCreateContextMenuOpened, setIsCreateContextMenuOpened] = useState(false);

  const { setNodes, setEdges, setViewport, toObject } = useReactFlow();

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
        onMouseLeave={() => {
          setIsCreateContextMenuOpened(false);
        }}
      />
    </StyledPanel>
  );
};
