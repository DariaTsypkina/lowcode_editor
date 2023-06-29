import { StyledDefaultHandle } from "./DeafultHandle.styles";
import { type HandleProps } from "reactflow";
import { useOnHandleHover } from "src/hooks/useOnHandleHover";

type DeafultHandleProps = HandleProps & {
  selected?: boolean;
};

export const DeafultHandle = (props: DeafultHandleProps) => {
  const { id } = props;

  const { handleMouseOver, handleMouseLeave } = useOnHandleHover(id);

  return <StyledDefaultHandle {...props} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} />;
};
