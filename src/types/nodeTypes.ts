import { type NodeTypes } from "reactflow";
import { CustomInput } from "src/components/Nodes/CustomInput/CustomInput";
import { InitialNode } from "src/components/Nodes/InitialNode/InitialNode";

export const nodeTypes: NodeTypes = {
  initialNode: InitialNode,
  customInput: CustomInput
};
