import React from "react";
import { styled } from "styled-components";

export function GrayButton({ children, ...props }) {
  return <Gray {...props}>{children}</Gray>;
}

const Gray = styled.button`
  align-items: center;
  margin: 5px;
  padding: 10px 15px;
  background-color: var(--color-light-gray);
  color: var(--color-black);
  border: 2.5px solid var(--color-main-gray);
  border-radius: 20px;
  font-weight: 700;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: var(--color-gray);
    color: var(--color-black);
    transition: all 0.3s;
  }
`