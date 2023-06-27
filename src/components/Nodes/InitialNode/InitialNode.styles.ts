import { Handle, Position } from "reactflow";
import styled, { css } from "styled-components";

export const StyledContainer = styled.div`
  position: relative;
`;

export const StyledNode = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: white;
  background-color: #1c1c1c;
  border-radius: 0.5rem;
`;

export const StyledContextMenu = styled.div<{ selected: boolean }>`
  position: absolute;
  top: -2.75rem;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #ffffff;
  background-color: #3c2452;
  padding: 0.5rem;
  visibility: ${({ selected }) => (selected ? "visible" : "hidden")};
  border-radius: 0.25rem;
`;

export const StyledButton = styled.button`
  display: flex;
  padding: 0.275rem;
  border: 1px solid white;
  background: none;
  border-radius: 0.25rem;
  color: white;

  &:not(:disabled) {
    cursor: pointer;
  }

  &:disabled {
    pointer-events: none;
  }

  &:hover {
    color: #efe692;
    border-color: #efe692;
  }
`;

export const StyledHandle = styled(Handle)<{ selected: boolean; position: Position }>`
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
