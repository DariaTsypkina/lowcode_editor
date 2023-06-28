import { StyledDefaultHandle } from "./DeafultHandle.styles";
import { type HandleProps } from "reactflow";

type DeafultHandleProps = HandleProps & {
  selected?: boolean;
};

export const DeafultHandle = (props: DeafultHandleProps) => {
  return <StyledDefaultHandle {...props} />;
};
