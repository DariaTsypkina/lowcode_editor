import { type FormEvent, useCallback, useEffect, useRef, useState } from "react";

import { NodeContextMenu } from "../NodeContextMenu/NodeContextMenu";
import { StyledContainer, StyledNode } from "./InitialNode.styles";
import { mdiPlayOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { type NodeProps, Position, useReactFlow, useStoreApi } from "reactflow";
import { DeafultHandle } from "src/components/Handles/DeafultHandle/DeafultHandle";
import { useDeleteNode } from "src/hooks/useDeleteNode";

export const InitialNode = (props: NodeProps) => {
  const { id, selected, data } = props;

  const { setNodes } = useReactFlow();
  const store = useStoreApi();

  const inputRef = useRef<HTMLInputElement>(null);
  const [isEdit, setIsEdit] = useState(false);

  const [nodeName, setNodeName] = useState(data.value);

  const handleChange = useCallback((e: FormEvent<HTMLInputElement>) => {
    setNodeName(e.currentTarget.value);
  }, []);

  const handleEdit = useCallback(() => {
    setIsEdit(true);
    setTimeout(() => {
      inputRef?.current?.focus();
    });
  }, []);

  const handleDelete = useDeleteNode();

  useEffect(() => {
    const { nodeInternals } = store.getState();

    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === id) {
          node.data = {
            ...node.data,
            value: nodeName
          };
        }

        return node;
      })
    );
  }, [id, nodeName, setNodes, store]);

  return (
    <StyledContainer>
      <NodeContextMenu selected={selected} onEdit={handleEdit} onDelete={handleDelete} />

      <StyledNode>
        <Icon path={mdiPlayOutline} size={2} color="#a31cab" />

        {isEdit ? (
          <input
            ref={inputRef}
            name="nodeName"
            value={data.value}
            onChange={handleChange}
            onInput={handleChange}
            onBlur={() => {
              setIsEdit(false);
            }}
          />
        ) : (
          <p>{data.value}</p>
        )}

        <DeafultHandle type="source" position={Position.Top} selected={selected} id={`${id}_a`} />
        <DeafultHandle type="source" position={Position.Right} selected={selected} id={`${id}_b`} />
        <DeafultHandle type="source" position={Position.Bottom} selected={selected} id={`${id}_c`} />
        <DeafultHandle type="source" position={Position.Left} selected={selected} id={`${id}_d`} />
      </StyledNode>
    </StyledContainer>
  );
};
