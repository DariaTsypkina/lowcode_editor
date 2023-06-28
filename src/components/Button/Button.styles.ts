import { type ButtonVariant } from "./Button.types";
import styled, { css } from "styled-components";

export const StyledButton = styled.button<{ variant?: ButtonVariant }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  margin: 0;
  border: none;
  background: none;
  border-radius: 4px;
  transition: all 0.4s;

  &:not(:disabled) {
    cursor: pointer;
    pointer-events: all;
  }

  ${({ variant }) => {
    if (variant === "white") {
      return css`
        background-color: #fff;
        &:hover {
          color: #fff;
          background-color: #000000;
        }
      `;
    }
  }}
`;
