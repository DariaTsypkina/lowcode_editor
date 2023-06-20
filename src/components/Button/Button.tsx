import { type ButtonHTMLAttributes, type ReactNode } from "react";
import "./Button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  color?: "white"
}

export const Button = (props: ButtonProps) => {
  const { children, color = "white", ...otherProps } = props;
  return (
    <button {...otherProps} className={`btn btn_${color}`}>
      {children}
    </button>
  );
};
