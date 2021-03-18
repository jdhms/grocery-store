import React, { useState } from "react";
import styled from "styled-components";
import { Icon, IContextualMenuProps, DefaultButton } from "@fluentui/react";

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

export const UserInfo: React.FC = () => {
  const [user, setUser] = useState<string>("");

  const iconName = user ? "UserFollowed" : "UserRemove";

  const menuProps: IContextualMenuProps = {
    items: [
      {
        key: "logout",
        text: "Logout",
        onClick: () => setUser(""),
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
      {user ? (
        <DropdownButton
          text={user}
          split
          splitButtonAriaLabel="See 2 options"
          aria-roledescription="split button"
          menuProps={menuProps}
        />
      ) : (
        <DropdownButton text="Login" onClick={(e) => setUser("Hackshaw")} />
      )}
    </Wrapper>
  );
};
