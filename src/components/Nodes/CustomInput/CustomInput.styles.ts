import styled from "styled-components";

export const StyledCustomInput = styled.div<{ selected?: boolean }>`
  padding: 0.5rem;
  border: 1px solid ${({ selected }) => (selected ? "#1c1c1c  " : "transparent")};
  border-radius: 0.5rem;
  background-color: white;
`;

export const StyledOptionsList = styled.ul`
  & > li:not(:first-child) {
    margin-top: 0.5rem;
  }
`;
