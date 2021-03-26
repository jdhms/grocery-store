import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
  DialogType,
  TextField,
  ITextFieldStyles,
  MessageBarType,
} from "@fluentui/react";
import styled from "styled-components";
import { Product } from "./ProductCard";
import { UserContext } from "../context";
import { ErrorMessage } from "./ErrorMessage";

interface Props extends Product {
  onComplete(product: Product | null): void;
  onCancel(): void;
}

export const OrderProductModal: React.FC<Props> = (props) => {
  const { onComplete, onCancel, name, category, id } = props;
  const { request } = useContext(UserContext);
  const [count, setCount] = useState("0");
  const [error, setError] = useState("");

  const orderProduct = async () => {
    setError("");
    try {
      const product = await request<Product>(
        `/product/${id}/order?count=${count}`,
        {
          method: "POST",
          body: "{}",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      onComplete(product);
    } catch (e) {
      setError(e.message);
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
      {error && (
        <ErrorMessage
          messageBarType={MessageBarType.error}
          isMultiline={false}
          onDismiss={() => setError("")}
        >
          Error creating order: {error}
        </ErrorMessage>
      )}
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

const HighlightSpan = styled.span`
  color: var(--color-primary-light);
`;

const textFieldStyles: Partial<ITextFieldStyles> = {
  fieldGroup: { width: 300 },
};
