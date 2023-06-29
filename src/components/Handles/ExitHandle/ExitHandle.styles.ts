import { type ExitVariant } from "./ExitHandle.types";
import { Handle } from "reactflow";
import styled, { css } from "styled-components";

export const StyledExitHandle = styled(Handle)<{ variant: ExitVariant; $noConnection?: boolean }>`
  width: 0.5rem;
  height: 1.5rem;
  left: calc(100% + 0.4rem);
  background-color: ${({ variant }) =>
    variant === "success" ? "#65ba14" : variant === "warning" ? "#f4b041" : "#e92e2e"};
  border: none;
  border-radius: 0 100% 100% 0;
  z-index: -1;
  transition: 0.2s;

  ${({ $noConnection }) => {
    if ($noConnection) {
      return css`
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-weight: bold;
        background-color: #1c1c1c;
        left: calc(100% + 0.59rem);
      `;
    }
  }}

  &:hover {
    left: calc(100% + 0.59rem);
  }
`;
