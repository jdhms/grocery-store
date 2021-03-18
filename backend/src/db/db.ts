import { CosmosClient, Database, Container } from "@azure/cosmos";

const endpoint = process.env.AZURE_COSMOS_ENDPOINT!;
const key = process.env.AZURE_COSMOS_MASTER_KEY!;

let cachedDb: Database;
let cachedContainer: Container;

export const getDatabase = async () => {
  if (!cachedDb) {
    const client = new CosmosClient({ endpoint, key });
    const { database } = await client.databases.createIfNotExists({
      id: "grocery-store-db",
    });
    cachedDb = database;
  }
  return cachedDb;
};

export const getContainer = async () => {
  if (!cachedContainer) {
    const db = await getDatabase();
    const { container } = await db.containers.createIfNotExists({
      id: "items",
    });
    cachedContainer = container;
  }
  return cachedContainer;
};
