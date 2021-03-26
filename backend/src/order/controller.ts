import { FastifyInstance } from "fastify";
import { ProductDetailsSchema } from "../product";
import * as queries from "./queries";
import * as uuid from "uuid";

type CreateRequest = {
  Params: { id: string };
  Querystring: { count: number };
};

type ItemRequest = {
  Params: {
    id: string;
    orderId: string;
  };
};

export const ordersController = async (fastify: FastifyInstance) => {
  fastify.route<CreateRequest>({
    method: "POST",
    url: "/product/:id/order",
    schema: {
      tags: ["Order"],
      operationId: "CreateOrder",
      summary: "Create Order",
      params: {
        id: { type: "string" },
      },
      querystring: {
        count: {
          type: "number",
          minimum: 1,
          default: 1,
        },
      },
      response: {
        201: ProductDetailsSchema,
      },
    },
    handler: async (req, res) => {
      const result = await queries.createOrder(req.params.id, {
        id: uuid.v4(),
        count: req.query.count,
        createdBy: req.user.username,
      });
      res.status(201).send(result);
    },
  });

  fastify.route<ItemRequest>({
    method: "DELETE",
    url: "/product/:id/order/:orderId",
    schema: {
      tags: ["Order"],
      operationId: "DeleteOrder",
      summary: "Delete Order",
      params: {
        id: { type: "string" },
        orderId: { type: "string" },
      },
      response: {
        204: {},
        400: {},
      },
    },
    handler: async (req, res) => {
      await queries.deleteOrder(req.params.id, req.params.orderId);
      res.status(204).send();
    },
  });
};
