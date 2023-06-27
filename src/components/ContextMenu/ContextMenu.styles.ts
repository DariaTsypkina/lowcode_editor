import styled from "styled-components";

export const StyledContextMenu = styled.div<{ position: { x: number; y: number } }>`
  position: fixed;
  top: ${({ position: { y } }) => y + "px"};
  left: ${({ position: { x } }) => x + "px"};
  background-color: white;
  padding: 1.25rem;
`;
