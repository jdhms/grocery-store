import { getContainer } from "../db";
import { getProduct } from "../product/queries";
import { Order } from "./schema";
import { ConflictError, NotFoundError } from "../errors";

export const createOrder = async (productId: string, order: Order) => {
  const container = await getContainer();
  const product = await getProduct(productId);

  product.orders.push(order);

  try {
    await container.item(product.id).replace(product, {
      accessCondition: { type: "IfMatch", condition: product._etag },
    });
    return {
      ...product,
      onOrder: product.onOrder + order.count
    }
  } catch (err) {
    if (err.code == 412) {
      throw new ConflictError();
    }
    throw err;
  }
};

export const deleteOrder = async (productId: string, orderId: string) => {
  const container = await getContainer();
  const product = await getProduct(productId);

  const orderIdx = product.orders.findIndex(o => o.id == orderId);
  if (orderIdx === -1) {
    throw new NotFoundError();
  }

  product.orders.splice(orderIdx, 1);

  try {
    const { resource } = await container.item(product.id).replace(product, {
      accessCondition: { type: "IfMatch", condition: product._etag },
    });
    return resource;
  } catch(err) {
    if (err.code === 412) {
      throw new ConflictError();
    }
    throw err;
  }
}