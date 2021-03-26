import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
  DialogType,
  TextField,
  ITextFieldStyles,
  Stack,
  MessageBarType,
} from "@fluentui/react";
import { Product } from "./ProductCard";
import { UserContext } from "../context";
import { ErrorMessage } from "./ErrorMessage";

interface Props {
  onCreated(product: Product | null): void;
  onCancel(): void;
}

const textFieldStyles: Partial<ITextFieldStyles> = {
  fieldGroup: { width: 300 },
};

const stackTokens = { childrenGap: 15 };

export const CreateProductModal: React.FC<Props> = (props) => {
  const { onCreated, onCancel } = props;
  const { request } = useContext(UserContext);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [inStock, setInStock] = useState("0");
  const [category, setCategory] = useState("");

  const createProduct = async () => {
    if (!name || !category) {
      setError("Invalid input");
      return;
    }
    setError("");
    try {
      const product = await request<Product>(`/product`, {
        method: "POST",
        body: JSON.stringify({
          name,
          category,
          count: parseInt(inStock),
        }),
      });
      onCreated(product);
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
        title: "Create new product",
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
          Error creating product: {error}
        </ErrorMessage>
      )}
      <Stack tokens={stackTokens}>
        <TextField
          label="Name"
          styles={textFieldStyles}
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          required
        />
        <TextField
          label="Category"
          styles={textFieldStyles}
          value={category}
          onChange={(e) => setCategory(e.currentTarget.value)}
          required
        />
        <TextField
          label="In Stock"
          styles={textFieldStyles}
          value={inStock}
          onChange={(e) => setInStock(e.currentTarget.value)}
          required
          type="number"
          min="1"
        />
      </Stack>
      <DialogFooter>
        <PrimaryButton onClick={createProduct} text="Confirm" />
        <DefaultButton onClick={onCancel} text="Cancel" />
      </DialogFooter>
    </Dialog>
  );
};
