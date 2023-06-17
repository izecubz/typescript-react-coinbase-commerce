import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

type ButtonPropsStyled = {
  styled: true;
  className?: never;
  style?: never;
};

type ButtonPropsWithClassName = {
  styled?: false;
  className?: string;
  style?: CSSProperties;
};

export type ButtonProps = (ButtonPropsStyled | ButtonPropsWithClassName) &
  HTMLAttributes<HTMLButtonElement> & {
    children?: ReactNode;
  };
