import React, { forwardRef } from "react";
import type { ButtonProps } from "./Button.types";
import styled from "styled-components";

const StyledButton = styled.button<ButtonProps>`
  background-color: #1652f0;
  border: 1px solid #1652f0;
  border-radius: 4px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  font-family: Graphik, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-size: 14px;
  line-height: 1.15;
  overflow: visible;
  padding: 12px 16px;
  position: relative;
  text-align: center;
  text-transform: none;
  transition: all 80ms ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: fit-content;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus {
    outline: 0;
  }

  &:hover {
    background-color: #0a46e4;
    border-color: #0a46e4;
  }

  &:active {
    background-color: #0039d7;
    border-color: #0039d7;
  }
`;

export const Button: React.FC<ButtonProps> = forwardRef(function Button(
  { children, styled, className, ...props },
  ref
) {
  return styled ? (
    <StyledButton id={props.id} ref={ref} {...props} type="button">
      {children ?? "Buy with Crypto"}
    </StyledButton>
  ) : (
    <button id={props.id} ref={ref} {...props} type="button">
      {children ?? "Buy with Crypto"}
    </button>
  );
});
