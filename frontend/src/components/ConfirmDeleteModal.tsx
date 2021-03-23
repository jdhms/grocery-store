import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
  DialogType,
  MessageBarType,
} from "@fluentui/react";
import { Product } from "./ProductCard";
import { UserContext } from "../context";
import { ErrorMessage } from "./ErrorMessage";

interface Props extends Product {
  onDeleted(id: string): void;
  onCancel(): void;
}

export const ConfirmDeleteProductModal: React.FC<Props> = (props) => {
  const { onDeleted, onCancel, name, category, id } = props;
  const { request } = useContext(UserContext);
  const [error, setError] = useState("");

  const deleteProduct = async () => {
    setError("");
    try {
      await request(`/product/${id}`, {
        method: "DELETE",
      });
      onDeleted(id);
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
        title: "Confirm Delete",
        subText: `Delete product ${name} in category ${category}?`,
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
          Error deleting product: {error}
        </ErrorMessage>
      )}
      <DialogFooter>
        <PrimaryButton onClick={deleteProduct} text="Delete" />
        <DefaultButton onClick={onCancel} text="Cancel" />
      </DialogFooter>
    </Dialog>
  );
};
