import * as React from "react";
import { CommandBar, ICommandBarItemProps } from "@fluentui/react";

interface Props {
  onCreateProduct(): void;
}

export const ProductCommandBar: React.FC<Props> = (props) => {
  const { onCreateProduct } = props;

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
            text: "Product",
            iconProps: { iconName: "ProductRelease" },
            onClick: onCreateProduct,
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
