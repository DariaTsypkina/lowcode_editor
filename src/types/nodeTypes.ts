import { type NodeTypes } from "reactflow";
import { CustomInputNode } from "src/components/Nodes/CustomInputNode/CustomInputNode";
import { InitialNode } from "src/components/Nodes/InitialNode/InitialNode";
import { MessageNode } from "src/components/Nodes/MessageNode/MessageNode";

export const nodeTypes: NodeTypes = {
  initialNode: InitialNode,
  messageNode: MessageNode,
  customInputNode: CustomInputNode
};
