import { useCallback, useEffect, useState } from "react";

import { nodeTypes } from "./types/nodeTypes";
import { mdiPlus, mdiTrayArrowDown } from "@mdi/js";
import Icon from "@mdi/react";
import ReactFlow, {
  Background,
  type Connection,
  Controls,
  type Edge,
  type Node,
  NodeResizer,
  NodeToolbar,
  Panel,
  type ReactFlowInstance,
  addEdge,
  useEdgesState,
  useNodesState
} from "reactflow";

import { Button } from "./components/Button/Button";
import { ContextMenu } from "./components/ContextMenu/ContextMenu";
import { CreateContextMenu } from "./components/CreateContextMenu/CreateContextMenu";

import "reactflow/dist/style.css";

export const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [isCreateContextMenuOpened, setIsCreateContextMenuOpened] = useState(false);

  useEffect(() => {
    (document.querySelector("a") as HTMLElement).style.display = "none";
  }, []);

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      setEdges((eds) => addEdge({ ...params, type: "smoothstep" }, eds));
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

  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem("react-flow-example", JSON.stringify(flow));
      console.log(flow);
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem("react-flow-example") ?? "");

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        rfInstance?.setViewport({ x, y, zoom });
      }
    };

    restoreFlow().catch(console.error);
  }, [rfInstance, setEdges, setNodes]);

  return (
    <div className="app">
      <ReactFlow
        onInit={setRfInstance}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        style={{ backgroundColor: "#d3d2e5" }}
        onPaneContextMenu={handleOnPaneContextMenu}
        onClick={() => {
          setContextMenuIsOpened(false);
        }}
      >
        <NodeToolbar />
        <NodeResizer />
        <Panel position="top-right" style={{ width: "100%", backgroundColor: "#efe692", margin: 0, padding: "10px" }}>
          <div
            style={{
              display: "flex",
              gap: "0.5rem"
            }}
          >
            <Button
              onClick={() => {
                setIsCreateContextMenuOpened(true);
              }}
            >
              <Icon path={mdiPlus} size={1} />
            </Button>
            <Button onClick={onSave}>
              <Icon path={mdiTrayArrowDown} size={1} />
            </Button>

            <Button onClick={onRestore}>Restore</Button>
          </div>

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
