import { StyledExitHandle } from "./ExitHandle.styles";
import { type ExitVariant } from "./ExitHandle.types";
import { type HandleProps } from "reactflow";
import { useOnHandleHover } from "src/hooks/useOnHandleHover";

type ExitHandleProps = HandleProps & {
  variant: ExitVariant;
  $noConnection?: boolean;
};

export const ExitHandle = (props: ExitHandleProps) => {
  const { id } = props;

  const { handleMouseOver, handleMouseLeave } = useOnHandleHover(id);

  return (
    <StyledExitHandle {...props} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
      {props.$noConnection && "!"}
    </StyledExitHandle>
  );
};
