import { getContainer } from "../db";
import { Category } from "./schema";

export const listAllCategories = async () => {
  const query = `
    SELECT COUNT(1) AS count, p.category AS name 
    FROM p 
    GROUP BY p.category
  `;
  const container = await getContainer();
  const { resources } = await container.items.query<Category>(query).fetchAll();
  return resources;
};
