import { useCallback, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import ReactFlow, { Background, useNodesState, useEdgesState, addEdge, type Edge, type Connection, Controls, Panel, NodeResizer, NodeToolbar, type Node, type NodeTypes } from "reactflow";

import "./App.css";
import "reactflow/dist/style.css";

import { Button } from "components/Button/Button";
import { InitialNode } from "./components/Nodes/InitialNode/InitialNode";

const initialNodes: Node[] = [
  { id: "1", position: { x: 500, y: 100 }, data: { label: "1" } },
  { id: "2", position: { x: 500, y: 200 }, data: { label: "2" } }
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" }
];

const nodeTypes: NodeTypes = {
  initialNode: InitialNode
};

export const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    (document.querySelector("a") as HTMLElement).style.display = "none";
  }, []);

  const onConnect = useCallback((params: Edge | Connection) => { setEdges((eds) => addEdge(params, eds)); }, [setEdges]);

  const handleAddNode = useCallback(() => {
    const lastNode = nodes[nodes.length - 1];
    const lastId = lastNode?.id || "0";
    const id = `${+lastId + 1}`;

    const newNode: Node = {
      id,
      position: {
        x: id === "1" ? 500 : lastNode?.position.x,
        y: id === "1" ? 100 : lastNode?.position.y + 75
      },
      data: {
        label: `${id}`
      }
    };

    setNodes(state => [...state, newNode]);
  }, [nodes, setNodes]);

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
      >
        <NodeToolbar />
        <NodeResizer />
        <Panel position="top-right" style={{ width: "100%", backgroundColor: "#efe692", margin: 0, padding: "10px" }}>
          <Button onClick={handleAddNode}>
            <Icon path={mdiPlus} size={1} />
          </Button>
        </Panel>
        <Controls />
        <Background color="#2f1e2f" />
      </ReactFlow>
    </div>
  );
};
