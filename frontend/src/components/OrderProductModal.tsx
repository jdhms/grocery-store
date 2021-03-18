import React, { useContext, useState } from "react";
import { Product } from "./ProductCard";
import { UserContext } from "../context";
import {
  Dialog,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
  DialogType,
  TextField,
  ITextFieldStyles,
} from "@fluentui/react";
import styled from "styled-components";

interface Props extends Product {
  onComplete(product: Product | null): void;
  onCancel(): void;
}

const HighlightSpan = styled.span`
  color: var(--color-primary-light);
`;

const textFieldStyles: Partial<ITextFieldStyles> = {
  fieldGroup: { width: 300 },
};

export const OrderProductModal: React.FC<Props> = (props) => {
  const { request } = useContext(UserContext);
  const [count, setCount] = useState("0");

  const { onComplete, onCancel, name, category, id } = props;

  const orderProduct = async () => {
    try {
      const product = await request<Product>(`/product/${id}/order`, {
        method: "POST",
        body: JSON.stringify({
          count,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      onComplete(product);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Dialog
      hidden={false}
      onDismiss={onCancel}
      dialogContentProps={{
        type: DialogType.normal,
        title: (
          <span>
            Ordering product <HighlightSpan>{name}</HighlightSpan> in category{" "}
            <HighlightSpan>{category}</HighlightSpan>
          </span>
        ),
      }}
      modalProps={{
        isBlocking: true,
      }}
    >
      <TextField
        label="Count"
        styles={textFieldStyles}
        value={count}
        onChange={(e) => setCount(e.currentTarget.value)}
        type="number"
        min={1}
      />
      <DialogFooter>
        <PrimaryButton onClick={orderProduct} text="Confirm" />
        <DefaultButton onClick={onCancel} text="Cancel" />
      </DialogFooter>
    </Dialog>
  );
};
