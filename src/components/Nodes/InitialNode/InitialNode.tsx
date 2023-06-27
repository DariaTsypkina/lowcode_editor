import { useCallback, useEffect, useRef, useState } from "react";

import { StyledButton, StyledContainer, StyledContextMenu, StyledHandle, StyledNode } from "./InitialNode.styles";
import { mdiContentCopy, mdiLock, mdiPencil, mdiPlayOutline, mdiTrashCanOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { type NodeProps, Position, useReactFlow, useStoreApi } from "reactflow";

export const InitialNode = (props: NodeProps) => {
  const { id, selected, data } = props;

  const { setNodes } = useReactFlow();
  const store = useStoreApi();

  const inputRef = useRef<HTMLInputElement>(null);
  const [isEdit, setIsEdit] = useState(false);

  const [nodeName, setNodeName] = useState(data.value);

  const handleChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setNodeName(e.currentTarget.value);
  }, []);

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
      <StyledContextMenu selected={selected}>
        <StyledButton>
          <Icon path={mdiContentCopy} size={0.75} />
        </StyledButton>
        <StyledButton
          onClick={() => {
            setIsEdit(true);
            setTimeout(() => {
              inputRef?.current?.focus();
            });
          }}
        >
          <Icon path={mdiPencil} size={0.75} />
        </StyledButton>
        <StyledButton>
          <Icon path={mdiLock} size={0.75} />
        </StyledButton>
        <StyledButton>
          <Icon path={mdiTrashCanOutline} size={0.75} />
        </StyledButton>
      </StyledContextMenu>

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

        <StyledHandle type="source" position={Position.Top} selected={selected} id="a" />
        <StyledHandle type="source" position={Position.Right} selected={selected} id="b" />
        <StyledHandle type="source" position={Position.Bottom} selected={selected} id="c" />
        <StyledHandle type="source" position={Position.Left} selected={selected} id="d" />
      </StyledNode>
    </StyledContainer>
  );
};
