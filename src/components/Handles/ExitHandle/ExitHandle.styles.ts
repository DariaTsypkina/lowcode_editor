import { type ExitVariant } from "./ExitHandle.types";
import { Handle } from "reactflow";
import styled from "styled-components";

export const StyledExitHandle = styled(Handle)<{ variant: ExitVariant }>`
  width: 0.5rem;
  height: 1.5rem;
  left: calc(100% + 0.4rem);
  background-color: ${({ variant }) =>
    variant === "success" ? "#65ba14" : variant === "warning" ? "#f4b041" : "#e92e2e"};
  border: none;
  border-radius: 0 100% 100% 0;
  z-index: -1;
  transition: 0.2s;

  &:hover {
    left: calc(100% + 0.59rem);
  }
`;
