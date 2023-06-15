import React from "react";

export interface StyledButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  styled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const StyledButton: React.FC<StyledButtonProps> = ({
  children,
  styled,
  className,
  ...props
}) => {
  return (
    <button
      type="button"
      {...props}
      className={
        styled
          ? "rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          : className
      }
    >
      {children || "Buy with Crypto"}
    </button>
  );
};
