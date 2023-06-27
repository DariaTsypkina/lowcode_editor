import { useCallback, useEffect, useState } from "react";

import { mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import ReactFlow, {
  Background,
  type Connection,
  Controls,
  type Edge,
  type Node,
  NodeResizer,
  NodeToolbar,
  type NodeTypes,
  Panel,
  addEdge,
  useEdgesState,
  useNodesState
} from "reactflow";

import { Button } from "./components/Button/Button";
import { ContextMenu } from "./components/ContextMenu/ContextMenu";
import { CreateContextMenu } from "./components/CreateContextMenu/CreateContextMenu";
import { CustomInput } from "./components/Nodes/CustomInput/CustomInput";
import { InitialNode } from "./components/Nodes/InitialNode/InitialNode";

import "./App.css";
import "reactflow/dist/style.css";

const nodeTypes: NodeTypes = {
  initialNode: InitialNode,
  customInput: CustomInput
};

const initialNodes: Node[] = [
  // { id: "1", position: { x: 500, y: 200 }, data: { value: "Initial Node" }, type: "initialNode" }
  // { id: "2", position: { x: 500, y: 200 }, data: { label: "2" } }
];

const initialEdges: Edge[] = [
  // { id: "e1-2", source: "1", target: "2" }
];

export const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [isCreateContextMenuOpened, setIsCreateContextMenuOpened] = useState(false);

  useEffect(() => {
    (document.querySelector("a") as HTMLElement).style.display = "none";
  }, []);

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

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

      setIsCreateContextMenuOpened(false);
    },
    [nodes, setNodes]
  );

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isContextMenuOpened, setContextMenuIsOpened] = useState(false);

  const handleOnPaneContextMenu = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setContextMenuIsOpened(true);
  };

  return (
    <div className="app">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        style={{ backgroundColor: "#d3d2e5" }}
        onPaneContextMenu={handleOnPaneContextMenu}
        onClick={() => {
          // setContextMenuIsOpened(false);
        }}
      >
        <NodeToolbar />
        <NodeResizer />
        <Panel position="top-right" style={{ width: "100%", backgroundColor: "#efe692", margin: 0, padding: "10px" }}>
          <Button
            onClick={() => {
              setIsCreateContextMenuOpened(true);
            }}
          >
            <Icon path={mdiPlus} size={1} />
          </Button>

          <CreateContextMenu
            isOpened={isCreateContextMenuOpened}
            onStart={handleAddNode}
            onCustomInput={handleAddNode}
          />
        </Panel>
        <Controls />
        <Background color="#2f1e2f" />

        <ContextMenu isOpened={isContextMenuOpened} position={position} />
      </ReactFlow>
    </div>
  );
};
