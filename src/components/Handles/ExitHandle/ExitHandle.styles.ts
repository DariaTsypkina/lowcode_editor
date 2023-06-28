import { type ExitVariant } from "./ExitHandle.types";
import { Handle } from "reactflow";
import styled from "styled-components";

export const StyledExitHandle = styled(Handle)<{ variant: ExitVariant }>`
  width: 0.25rem;
  height: 1.5rem;
  background-color: ${({ variant }) =>
    variant === "success" ? "#65ba14" : variant === "warning" ? "#f4b041" : "#e92e2e"};
  border: none;
  border-radius: 0 100% 100% 0;
  z-index: -1;
`;
