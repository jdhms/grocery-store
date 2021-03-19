import * as React from "react";
import { CommandBar, ICommandBarItemProps } from "@fluentui/react";

interface Props {
  onCreateOrder(): void;
}

export const OrderCommandBar: React.FC<Props> = (props) => {
  const { onCreateOrder } = props;

  const items: ICommandBarItemProps[] = [
    {
      key: "newItem",
      text: "New",
      cacheKey: "newItem",
      iconProps: { iconName: "Add" },
      subMenuProps: {
        items: [
          {
            key: "product",
            text: "Order",
            iconProps: { iconName: "ProductRelease" },
            onClick: onCreateOrder,
          },
        ],
      },
    },
  ];

  return (
    <div>
      <CommandBar
        items={items}
        ariaLabel="Use left and right arrow keys to navigate between commands"
      />
    </div>
  );
};
