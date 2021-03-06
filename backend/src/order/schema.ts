export const OrderSchema = {
  type: "object",
  required: ["count"],
  properties: {
    id: {
      readOnly: true,
      type: "string",
    },
    count: {
      type: "integer",
      minimum: 0,
      default: 0,
    },
    createdBy: {
      readOnly: true,
      type: "string",
    },
  },
};

export interface Order {
  id: string;
  count: number;
  createdBy: string;
}
