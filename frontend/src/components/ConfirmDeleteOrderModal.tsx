import React, { useContext, useState } from "react";
import { UserContext } from "../context";
import {
  Dialog,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
  DialogType,
  MessageBarType,
} from "@fluentui/react";
import { ErrorMessage } from "./ErrorMessage";

interface Props {
  productId: string;
  orderId: string;
  onDeleted(productId: string, orderId: string): void;
  onCancel(): void;
}

export const ConfirmDeleteOrderModal: React.FC<Props> = (props) => {
  const { onDeleted, onCancel, productId, orderId } = props;
  const { request } = useContext(UserContext);
  const [error, setError] = useState("");

  const deleteOrder = async () => {
    setError("");
    try {
      await request(`/product/${productId}/order/${orderId}`, {
        method: "DELETE",
      });
      onDeleted(productId, orderId);
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
        subText: `Delete order ${orderId}?`,
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
          Error deleting order: {error}
        </ErrorMessage>
      )}
      <DialogFooter>
        <PrimaryButton onClick={deleteOrder} text="Delete" />
        <DefaultButton onClick={onCancel} text="Cancel" />
      </DialogFooter>
    </Dialog>
  );
};
