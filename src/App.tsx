import { useCallback, useEffect, useState } from "react";

import { nodeTypes } from "./types/nodeTypes";
import ReactFlow, {
  Background,
  type Connection,
  Controls,
  type Edge,
  NodeResizer,
  NodeToolbar,
  addEdge,
  useEdgesState,
  useNodesState
} from "reactflow";

import { ContextMenu } from "./components/ContextMenu/ContextMenu";
import { Panel } from "./components/Panel/Panel";

import "reactflow/dist/style.css";

export const App = () => {
  const [nodes, , onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    (document.querySelector("a") as HTMLElement).style.display = "none";
  }, []);

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      setEdges((eds) => addEdge({ ...params, type: "smoothstep" }, eds));
    },
    [setEdges]
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
      >
        <NodeToolbar />
        <NodeResizer />

        <Panel />

        <Controls />

        <Background color="#2f1e2f" />

        <ContextMenu
          isOpened={isContextMenuOpened}
          position={position}
          onMouseLeave={() => {
            setContextMenuIsOpened(false);
          }}
        />
      </ReactFlow>
    </div>
  );
};
