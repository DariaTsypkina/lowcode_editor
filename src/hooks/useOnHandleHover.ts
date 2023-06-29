import { useCallback } from "react";

import { useReactFlow } from "reactflow";

export const useOnHandleHover = (nodeId?: string) => {
  const { setEdges } = useReactFlow();

  const handleMouseOver = useCallback(() => {
    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        selected: edge.sourceHandle === nodeId || edge.targetHandle === nodeId
      }))
    );
  }, [nodeId, setEdges]);

  const handleMouseLeave = useCallback(() => {
    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        selected: false
      }))
    );
  }, [setEdges]);

  return {
    handleMouseOver,
    handleMouseLeave
  };
};
