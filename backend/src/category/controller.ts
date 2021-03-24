import { FastifyInstance } from "fastify";
import { CategorySchema } from "./schema";
import * as queries from "./queries";

export const categoryController = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "GET",
    url: "/category",
    schema: {
      tags: ["Category"],
      summary: "List Product Categories",
      operationId: "ListCategories",
      response: {
        200: {
          type: "array",
          items: CategorySchema,
        },
      },
    },
    handler: async (_, res) => {
      const result = await queries.listAllCategories();
      res.send(result);
    },
  });
};
