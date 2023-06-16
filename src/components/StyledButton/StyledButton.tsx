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
          ? "rounded-md cursor-pointer font-semibold bg-gradient-to-b from-blue-600 to-blue-700 px-3.5 py-2.5 text-sm text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:from-blue-300 disabled:to-blue-300 disabled:cursor-not-allowed"
          : className
      }
    >
      {children || "Buy with Crypto"}
    </button>
  );
};
