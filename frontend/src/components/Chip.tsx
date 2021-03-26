import { Icon } from "@fluentui/react";
import React from "react";
import styled from "styled-components";

interface Props {
  label: string;
  icon?: string;
  color: string;
}

export const Chip: React.FC<Props> = (props) => {
  const { label, icon, color } = props;

  return (
    <Wrapper color={color}>
      <div>
        {icon && (
          <Icon
            iconName={icon}
            style={{
              fontSize: 16,
              height: 16,
              width: 16,
              marginRight: 5,
              verticalAlign: "middle",
            }}
          />
        )}
      </div>
      <div>{label}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ color: string }>`
  border-radius: 0.5rem;
  border: 1px solid;
  border-color: ${(props) => props.color};
  color: var(--text-muted);
  padding: 5px 10px;
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  margin: 0 2px;
`;
