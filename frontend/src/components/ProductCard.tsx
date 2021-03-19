import React from "react";
import styled from "styled-components";
import {
  Persona,
  PersonaSize,
  IconButton,
  IContextualMenuProps,
} from "@fluentui/react";
import { Chip } from "./Chip";
import { useHistory } from "react-router";

export interface Product {
  id: string;
  name: string;
  onOrder: number;
  inStock: number;
  category: string;
}

const Card = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: var(--background-paper);
  padding: 1.5rem 2rem 1rem 2rem;
  border-radius: 0.5rem;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`;

const InfoSection = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  z-index: 10;
  position: relative;
  margin-top: 2rem;
`;

const DropdownButton = styled(IconButton)`
  position: absolute;
  right: 1.5rem;
  top: 2rem;
  z-index: 100;
  color: var(--color-primary);
`;

const colorFromCount = (count: number) => {
  if (count > 8) {
    return "var(--color-success)";
  }
  if (count > 3) {
    return "var(--color-warning)";
  }
  return "var(--color-error)";
};

interface Props extends Product {
  onDelete(id: string): void;
  onPlaceOrder(id: string): void;
}

export const ProductCard: React.FC<Props> = (props) => {
  const {
    name,
    onOrder,
    inStock,
    category,
    id,
    onDelete,
    onPlaceOrder,
  } = props;
  const history = useHistory();

  const actionMenuProps: IContextualMenuProps = {
    alignTargetEdge: true,
    items: [
      {
        key: "delete",
        text: "Delete",
        iconProps: { iconName: "Trash" },
        onClick: () => onDelete(id),
      },
      {
        key: "order",
        text: "Place Order",
        iconProps: { iconName: "AddIn" },
        onClick: () => onPlaceOrder(id),
      },
      {
        key: "details",
        text: "View Orders",
        iconProps: { iconName: "WaitListConfirm" },
        onClick: () => history.push(`/product/${id}`),
      },
    ],
  };

  return (
    <Card>
      <DropdownButton
        iconProps={{ iconName: "CollapseMenu" }}
        menuIconProps={{ style: { display: "none" } }}
        menuProps={actionMenuProps}
      />
      <Persona
        size={PersonaSize.size56}
        text={name}
        imageInitials={name.slice(0, 2)}
        secondaryText={category}
      />
      <InfoSection>
        <Chip
          color={colorFromCount(inStock)}
          label={`In Stock: ${inStock}`}
          icon="CheckMark"
        />

        <Chip
          color="var(--color-primary-light)"
          label={`Back Order: ${onOrder}`}
          icon="CheckMark"
        />
      </InfoSection>
    </Card>
  );
};
