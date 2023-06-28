import { useState } from "react";

import { NodeContextMenu } from "../NodeContextMenu/NodeContextMenu";
import { StyledCustomInput, StyledOptionsList } from "./CustomInput.styles";
import { type NodeProps, Position } from "reactflow";
import { DeafultHandle } from "src/components/Handles/DeafultHandle/DeafultHandle";
import { ExitHandle } from "src/components/Handles/ExitHandle/ExitHandle";
import { type ExitVariant } from "src/components/Handles/ExitHandle/ExitHandle.types";
import { useDeleteNode } from "src/hooks/useDeleteNode";

const initialOptions: ExitVariant[] = ["success", "warning", "error"];

export const CustomInput = (props: NodeProps) => {
  const { selected } = props;

  const handleDelete = useDeleteNode();

  const [options] = useState(initialOptions);

  return (
    <StyledCustomInput selected={selected}>
      <NodeContextMenu selected={selected} onDelete={handleDelete} />
      <p>CustomInput</p>

      <p>Options</p>

      <StyledOptionsList>
        {options.map((option, idx) => (
          <li key={idx} style={{ position: "relative" }}>
            {option}
            <ExitHandle
              variant={option}
              type="source"
              id={`exit_${option}_${idx}`}
              position={Position.Right}
              style={{ left: "calc(100% + 0.59rem)" }}
            />
          </li>
        ))}
      </StyledOptionsList>

      <DeafultHandle selected type="target" position={Position.Top} />
    </StyledCustomInput>
  );
};
