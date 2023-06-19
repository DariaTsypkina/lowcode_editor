import { useCallback, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import ReactFlow, { Background, useNodesState, useEdgesState, addEdge, type Edge, type Connection, Controls, Panel, NodeResizer, NodeToolbar } from "reactflow";

import "reactflow/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 50, y: 100 }, data: { label: "1" } },
  { id: "2", position: { x: 50, y: 200 }, data: { label: "2" } }
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    (document.querySelector("a") as HTMLElement).style.display = "none";
  }, []);

  const onConnect = useCallback((params: Edge | Connection) => { setEdges((eds) => addEdge(params, eds)); }, [setEdges]);

  const handleAddNode = useCallback(() => {
    const lastId = nodes[nodes.length - 1]?.id || "1";
    const id = `${+lastId + 1}`;

    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500
      },
      data: {
        label: `${id}`
      }
    };

    setNodes(state => [...state, newNode]);
  }, [nodes, setNodes]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        style={{ backgroundColor: "#D3D2E5" }}
      >
        <NodeToolbar />
        <NodeResizer />
        <Panel position="top-right" style={{ width: "100%", backgroundColor: "#e7e1a5", margin: 0, padding: "10px" }} >
          <button onClick={handleAddNode}>
            <Icon path={mdiPlus} size={1} />
          </button>
        </Panel>
        <Controls />
        <Background color="#2f1e2f" />
      </ReactFlow>
    </div>
  );
};
