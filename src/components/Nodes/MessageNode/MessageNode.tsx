import { useEffect, useState } from "react";

import { StyledInfo, StyledMessageNode, StyledSubtitle, StyledTitle } from "./MessageNode.styles";
import { mdiMessage } from "@mdi/js";
import Icon from "@mdi/react";
import { type NodeProps, Position, getConnectedEdges, useEdges, useReactFlow } from "reactflow";
import { DeafultHandle } from "src/components/Handles/DeafultHandle/DeafultHandle";

export const MessageNode = (props: NodeProps) => {
  const { id, selected } = props;

  const [isValid, setIsValid] = useState(true);

  const { getNode } = useReactFlow();
  const edges = useEdges();

  useEffect(() => {
    const thisNode = getNode(id);
    if (!thisNode) return;
    const connectedEdges = getConnectedEdges([thisNode], edges);
    setIsValid(!!connectedEdges.length);
  }, [edges, getNode, id]);

  return (
    <StyledMessageNode selected={selected} isValid={isValid}>
      <StyledTitle>
        <Icon path={mdiMessage} size={0.75} />
        <span>Message Node</span>
      </StyledTitle>

      <StyledSubtitle>Lorem ipsum consectetur vitae?</StyledSubtitle>

      <StyledInfo>Lorem ipsum dolor sit amet consectetur adipisicing elit.</StyledInfo>

      <DeafultHandle type="target" position={Position.Top} selected={selected} id={`${id}_a`} />
      <DeafultHandle type="source" position={Position.Right} selected={selected} id={`${id}_b`} />
      <DeafultHandle type="source" position={Position.Bottom} selected={selected} id={`${id}_c`} />
      <DeafultHandle type="source" position={Position.Left} selected={selected} id={`${id}_d`} />
    </StyledMessageNode>
  );
};
