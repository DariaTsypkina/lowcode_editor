import { StyledExitHandle } from "./ExitHandle.styles";
import { type ExitVariant } from "./ExitHandle.types";
import { type HandleProps } from "reactflow";
import { type CSSProperties } from "styled-components";

type ExitHandleProps = HandleProps & {
  style?: CSSProperties;
  variant: ExitVariant;
};

export const ExitHandle = (props: ExitHandleProps) => {
  return <StyledExitHandle {...props} />;
};
