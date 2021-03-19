import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export const Layout: React.FC = (props) => {
  const { children } = props;

  return (
    <>
      <Global />
      <Root>
        <Header />
        <ContentWrapper>
          <Sidebar />
          <Content>{children}</Content>
        </ContentWrapper>
        {/* <Footer /> */}
      </Root>
    </>
  );
};

const Global = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  :root {
    --background-main: #fafafa;
    --background-paper: #fff;
    --background-disabled: #616161;
    --color-primary: rgb(0,120,212);
    --color-primary-light: #7986cb;
    --color-warning: #ffb74d;
    --color-error: #e57373;
    --color-success: #81c784;
    --text-muted: #424242;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--background-main);
  }
  html, body {
    padding: 0;
    margin: 0;
    height: 100%;
  }
`;

const Root = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  flex: 1 1 auto;
  align-items: stretch;
`;

const Content = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  background-color: var(--background-main);
`;
