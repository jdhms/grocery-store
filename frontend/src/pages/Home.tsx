import React, { useContext } from "react";
import styled from "styled-components";
import { Text, ActionButton } from "@fluentui/react";
import { ProductList } from "../components";
import { UserContext } from "../context";
import hero from "../assets/hero.png";
import cart from "../assets/shopping-cart.png";

export const Home: React.FC = () => {
  const { username, login } = useContext(UserContext);

  if (username) {
    return <ProductList />;
  }

  return (
    <div>
      <WrapHeader>
        <StyledMega variant="mega">RBAC Grocery Store</StyledMega>
        <StyledActionButton iconProps={{ iconName: "Contact" }} onClick={login}>
          Login
        </StyledActionButton>
      </WrapHeader>

      <Section>
        <SectionInner>
          <div>
            <h2>
              <Text variant="xxLarge">APIM + RBAC</Text>
            </h2>
            <p>
              <Text variant="large">
                This grocery store demo application was created to show the
                power of the integration of Azure Role Based Access control and
                Azure API Management.
              </Text>
            </p>

            <p>
              <Text variant="large">
                Azure role-based access control (Azure RBAC) is a system that
                provides fine-grained access management of Azure resources.
                Using Azure RBAC, you can segregate duties within your team and
                grant only the amount of access to users that they need to
                perform their jobs.
              </Text>
            </p>

            <p>
              <Text variant="large">
                API Management (APIM) is a way to create consistent and modern
                API gateways for existing back-end services
              </Text>
            </p>
          </div>
          <img src={cart} alt="shopping cart" />
        </SectionInner>
      </Section>
    </div>
  );
};

const WrapHeader = styled.div`
  padding: 5rem;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;
  background-image: url(${hero});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  color: #fff;
`;

const StyledMega = styled(Text)`
  color: #fff;
  margin-bottom: 1rem;

  @media screen and (max-width: 500px) {
    font-size: 36px;
  }
  @media screen and (max-width: 700px) {
    font-size: 48px;
  }
  @media screen and (max-width: 900px) {
    font-size: 52px;
  }
`;

const StyledActionButton = styled(ActionButton)`
  color: #fff;
  border: 1px solid #fff;
  border-radius: 5px;
  padding-left: 2rem;
  padding-right: 2rem;

  *,
  i:hover,
  *:active {
    color: #fff !important;
  }
`;

const Section = styled.div<{ bg?: string }>`
  padding: 2rem 4rem;
  width: 100%;
  background-color: ${(props) => props.bg ?? "var(--background-main)"};
`;

const SectionInner = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  img {
    padding: 5rem;
    width: 400px;

    @media screen and (max-width: 900px) {
      padding: 2rem;
    }
  }

  div {
    padding: 0 3rem;

    @media screen and (max-width: 900px) {
      padding: 0;
    }
  }

  @media screen and (max-width: 900px) {
    flex-flow: column nowrap;
  }
`;
