import React from "react";
import styled from "styled-components";

export const Footer: React.FC = () => (
  <Wrapper>
    <p>© 2021, Microsoft</p>
  </Wrapper>
);

const Wrapper = styled.footer`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  background-color: gray;
`;
