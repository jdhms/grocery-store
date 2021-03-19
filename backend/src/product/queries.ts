import { NotFoundError } from "../errors";
import { getContainer } from "../db";
import { Product, ProductDetails } from "./schema";

const PAGE_SIZE = 16;

export const listAllProducts = async (page = 0) => {
  const query = `
    SELECT p.id,p.name,p.category,p.inStock,
      (SELECT VALUE SUM(o.count) FROM o IN p.orders) as onOrder
    FROM p
    OFFSET @page
    LIMIT @pageSize
  `;
  const container = await getContainer();
  const { resources } = await container.items
    .query<Product>(
      {
        query,
        parameters: [
          { name: "@pageSize", value: PAGE_SIZE },
          { name: "@page", value: page * PAGE_SIZE },
        ],
      },
      {
        maxItemCount: PAGE_SIZE,
      }
    )
    .fetchAll();
  return resources;
};

export const listProductsInCategory = async (category: string, page = 0) => {
  const query = `
    SELECT p.id,p.name,p.category,p.inStock,
      (SELECT VALUE SUM(o.count) FROM o IN p.orders) as onOrder
    FROM p
    WHERE p.category = @category
    OFFSET @page
    LIMIT @pageSize
  `;
  const container = await getContainer();
  const { resources } = await container.items
    .query<Product>(
      {
        query,
        parameters: [
          { name: "@pageSize", value: PAGE_SIZE },
          { name: "@page", value: page * PAGE_SIZE },
          { name: "@category", value: category },
        ],
      },
      {
        maxItemCount: PAGE_SIZE,
      }
    )
    .fetchAll();
  return resources;
};

export const createProduct = async (product: ProductDetails) => {
  const container = await getContainer();
  const { resource } = await container.items.create<Product>(product);
  return {
    ...resource,
    onOrder: 0,
  };
};

export const getProduct = async (id: string) => {
  const container = await getContainer();
  const { resource } = await container.item(id).read<ProductDetails>();

  if (!resource) {
    throw new NotFoundError();
  }

  return {
    ...resource,
    onOrder: resource?.orders.reduce((tot, next) => tot + next.count, 0),
  };
};

export const deleteProduct = async (id: string) => {
  const container = await getContainer();
  const { resource } = await container.item(id).delete();
  return resource;
};
