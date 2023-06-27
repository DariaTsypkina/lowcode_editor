import { StyledCustomInput } from "./CustomInput.styles";
import { Handle, type NodeProps, Position } from "reactflow";

const options = ["success", "warning", "error"];

export const CustomInput = (props: NodeProps) => {
  return (
    <StyledCustomInput>
      <p>CustomInput</p>

      <p>Options</p>

      <ul>
        {options.map((option) => (
          <li key={option} style={{ position: "relative" }}>
            {option}
            <Handle type="source" position={Position.Right} style={{ right: "0" }} />
          </li>
        ))}
      </ul>
    </StyledCustomInput>
  );
};
