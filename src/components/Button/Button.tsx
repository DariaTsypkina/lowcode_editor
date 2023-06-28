import { type ButtonHTMLAttributes, type ReactNode } from "react";

import { StyledButton } from "./Button.styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: "white";
}

export const Button = (props: ButtonProps) => {
  const { children, variant = "white", ...otherProps } = props;
  return (
    <StyledButton {...otherProps} variant={variant}>
      {children}
    </StyledButton>
  );
};
