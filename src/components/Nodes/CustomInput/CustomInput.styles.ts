import styled from "styled-components";

export const StyledCustomInput = styled.div<{ selected?: boolean }>`
  padding: 0.5rem;
  border: 1px solid ${({ selected }) => (selected ? "#1c1c1c  " : "transparent")};
  border-radius: 0.5rem;
  background-color: white;
`;

export const StyledTitle = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  color: #0c595f;
  border-radius: 0.5rem;
  background-color: #b7f8ff;
  font-weight: bold;
  font-size: 0.825rem;
`;

export const StyledSubtitle = styled.p`
  margin-top: 0.75rem;
  font-size: 0.75rem;
  color: #808080;
`;

export const StyledOptionsList = styled.ul`
  margin-top: 0.75rem;
  font-size: 0.75rem;
  & > li {
    &:not(:first-child) {
      margin-top: 0.75rem;
    }
  }
`;
