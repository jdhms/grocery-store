import React, { useContext } from "react";
import { UserContext } from "../context";
import {
  Dialog,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
  DialogType,
} from "@fluentui/react";

interface Props {
  productId: string;
  orderId: string;
  onDeleted(productId: string, orderId: string): void;
  onCancel(): void;
}

export const ConfirmDeleteOrderModal: React.FC<Props> = (props) => {
  const { request } = useContext(UserContext);

  const { onDeleted, onCancel, productId, orderId } = props;

  const deleteOrder = async () => {
    try {
      await request(`/product/${productId}/order/${orderId}`, {
        method: "DELETE",
      });
      onDeleted(productId, orderId);
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
        subText: `Delete order ${orderId}?`,
      }}
      modalProps={{
        isBlocking: true,
      }}
    >
      <DialogFooter>
        <PrimaryButton onClick={deleteOrder} text="Delete" />
        <DefaultButton onClick={onCancel} text="Cancel" />
      </DialogFooter>
    </Dialog>
  );
};
