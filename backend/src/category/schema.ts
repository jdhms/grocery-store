export const CategorySchema = {
  type: "object",
  required: ["name", "count"],
  properties: {
    name: {
      type: "string",
      description: "Category name",
    },
    count: {
      type: "number",
      description: "Products in category",
    },
  },
};

export interface Category {
  name: string;
  count: number;
}
