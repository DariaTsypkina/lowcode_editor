import styled from "styled-components";

export const StyledContextMenu = styled.div<{ selected: boolean }>`
  position: absolute;
  top: -2.25rem;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #ffffff;
  background-color: #3c2452;
  padding: 0.25rem;
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
