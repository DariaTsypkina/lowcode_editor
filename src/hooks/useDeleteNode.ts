import { useCallback } from "react";

import { getConnectedEdges, useNodeId, useReactFlow } from "reactflow";

export const useDeleteNode = () => {
  const id = useNodeId();

  const { setNodes, getNode, getEdges, setEdges } = useReactFlow();

  const handleDelete = useCallback(() => {
    if (!id) return;

    const thisNode = getNode(id);

    if (!thisNode) return;

    const edges = getEdges();
    const connectedEdges = getConnectedEdges([thisNode], edges);

    const connectedEdgesIds = connectedEdges.map((ed) => ed.id);

    setNodes((nds) => nds.filter((nd) => nd.id !== id));

    setEdges((eds) => eds.filter((ed) => !connectedEdgesIds.includes(ed.id)));
  }, [getEdges, getNode, id, setEdges, setNodes]);

  return handleDelete;
};
