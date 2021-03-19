import { OrderSchema, Order } from "../order";

export const ProductSchema = {
  type: "object",
  required: ["name", "category"],
  properties: {
    id: {
      readOnly: true,
      type: "string",
      format: "uuid",
      description: "Product ID",
    },
    name: {
      type: "string",
      description: "Product name",
    },
    category: {
      type: "string",
      description: "Product category",
    },
    inStock: {
      type: "integer",
      minimum: 0,
      default: 0,
    },
    onOrder: {
      readOnly: true,
      type: "integer",
    },
  },
};

export const ProductDetailsSchema = {
  ...ProductSchema,
  properties: {
    ...ProductSchema.properties,
    orders: {
      type: "array",
      items: OrderSchema,
    },
  },
};

export interface ProductWrite {
  name: string;
  category: string;
  inStock?: number;
}

export interface Product extends ProductWrite {
  id: string;
  onOrder?: number;
}

export interface ProductDetails extends Product {
  orders: Order[];
}
