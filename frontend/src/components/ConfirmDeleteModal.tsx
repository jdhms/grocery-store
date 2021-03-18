import React, { useContext } from "react";
import { Product } from "./ProductCard";
import { UserContext } from "../context";
import {
  Dialog,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
  DialogType,
} from "@fluentui/react";

interface Props extends Product {
  onDeleted(id: string): void;
  onCancel(): void;
}

export const ConfirmDeleteModal: React.FC<Props> = (props) => {
  const { request } = useContext(UserContext);

  const { onDeleted, onCancel, name, category, id } = props;

  const deleteProduct = async () => {
    try {
      await request(`/product/${id}`, {
        method: "DELETE",
      });
      onDeleted(id);
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
        title: "Confirm Delete",
        subText: `Delete product ${name} in category ${category}?`,
      }}
      modalProps={{
        isBlocking: true,
      }}
    >
      <DialogFooter>
        <PrimaryButton onClick={deleteProduct} text="Delete" />
        <DefaultButton onClick={onCancel} text="Cancel" />
      </DialogFooter>
    </Dialog>
  );
};
