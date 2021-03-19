import { FastifyInstance } from "fastify";
import { OrderSchema, OrderWrite } from "./schema";
import { ProductDetailsSchema } from "../product";
import * as queries from "./queries";
import * as uuid from "uuid";

type CreateRequest = {
  Body: OrderWrite;
  Params: { id: string };
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
      summary: "Create Order",
      body: OrderSchema,
      params: {
        id: { type: "string" },
      },
      response: {
        201: ProductDetailsSchema,
      },
    },
    handler: async (req, res) => {
      const result = await queries.createOrder(req.params.id, {
        id: uuid.v4(),
        count: req.body.count,
        createdBy: req.body.createdBy,
      });
      res.status(201).send(result);
    },
  });

  fastify.route<ItemRequest>({
    method: "DELETE",
    url: "/product/:id/order/:orderId",
    schema: {
      tags: ["Order"],
      summary: "Create Order",
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
