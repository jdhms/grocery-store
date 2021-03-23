import React, { useContext } from "react";
import styled from "styled-components";
import { Icon, IContextualMenuProps, DefaultButton } from "@fluentui/react";
import { UserContext } from "../context";

export const UserInfo: React.FC = () => {
  const { login, logout, username } = useContext(UserContext);

  const iconName = username ? "UserFollowed" : "UserRemove";

  const menuProps: IContextualMenuProps = {
    items: [
      {
        key: "logout",
        text: "Logout",
        onClick: () => {
          logout();
        },
      },
    ],
  };

  return (
    <Wrapper>
      <Icon
        iconName={iconName}
        style={{
          fontSize: 60,
          height: 60,
          width: 60,
          color: "var(--text-muted)",
        }}
      />
      {username ? (
        <DropdownButton
          text={username}
          split
          splitButtonAriaLabel="See 2 options"
          aria-roledescription="split button"
          menuProps={menuProps}
        />
      ) : (
        <DropdownButton text="Login" onClick={login} />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  width: 100%;
`;

const DropdownButton = styled(DefaultButton)`
  margin-top: 1rem;
`;
