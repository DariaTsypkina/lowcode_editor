import { Handle, Position } from "reactflow";
import styled, { css } from "styled-components";

export const StyledDefaultHandle = styled(Handle)<{ selected?: boolean; position: Position }>`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 0;
  border: none;
  visibility: ${({ selected }) => (selected ? "visible" : "hidden")};
  background-color: #1c1c1c;
  ${({ position }) => {
    if (position === Position.Top) {
      return css`
        top: -1rem;
      `;
    }
    if (position === Position.Right) {
      return css`
        right: -1rem;
      `;
    }
    if (position === Position.Bottom) {
      return css`
        bottom: -1rem;
      `;
    }
    if (position === Position.Left) {
      return css`
        left: -1rem;
      `;
    }
  }}
`;
