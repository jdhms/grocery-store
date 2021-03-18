export const OrderSchema = {
  type: "object",
  required: ["count"],
  properties: {
    id: {
      type: "string",
      readOnly: true,
    },
    count: {
      type: "integer",
      minimum: 0,
    },
    createdBy: {
      readOnly: true,
      type: "string",
    },
  },
};

export interface OrderWrite {
  count: number;
  createdBy: string;
}

export interface Order extends OrderWrite {
  id: string;
}
