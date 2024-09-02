import React from "react";
import Spinner from "../Spinner";

interface ButtonProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  isSubmitting?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  type = "button",
  isSubmitting = false,
  className,
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center justify-center ${className}`}
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <Spinner className="mr-2" height={15} width={15} />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
