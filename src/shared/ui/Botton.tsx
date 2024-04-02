import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  version?: string;
  type?: "button" | "submit" | "reset";
  isDisabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  version = "primary",
  type = "button",
  isDisabled = false,
}) => {
  return (
    <button type={type} disabled={isDisabled} className={`btn btn-${version}`}>
      {children}
    </button>
  );
};

export default Button;
