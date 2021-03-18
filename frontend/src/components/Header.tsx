import React from "react";
import styled from "styled-components";

const Root = styled.div`
  background-color: var(--color-primary);
  width: 100%;
  height: 60px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  color: #fff;
`;

const Brand = styled.div`
  font-size: 1.5rem;
`;

export const Header: React.FC = () => (
  <Root>
    <Brand>Grocery Store</Brand>
  </Root>
);
