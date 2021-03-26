import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Root = styled.div`
  background: var(--color-primary);
  width: 100%;
  height: 60px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  color: #fff;
`;

const Brand = styled(Link)`
  font-size: 1.5rem;
  color: #fff;
  text-decoration: none;

  :hover,
  :active {
    text-decoration: none;
    color: #fff;
  }
`;

export const Header: React.FC = () => {
  return (
    <Root>
      <Brand to="/">RBAC Store</Brand>
    </Root>
  );
};
