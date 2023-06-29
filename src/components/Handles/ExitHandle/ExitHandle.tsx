import { StyledExitHandle } from "./ExitHandle.styles";
import { type ExitVariant } from "./ExitHandle.types";
import { type HandleProps } from "reactflow";

type ExitHandleProps = HandleProps & {
  variant: ExitVariant;
  $noConnection?: boolean;
};

export const ExitHandle = (props: ExitHandleProps) => {
  return <StyledExitHandle {...props}>{props.$noConnection && "!"}</StyledExitHandle>;
};
