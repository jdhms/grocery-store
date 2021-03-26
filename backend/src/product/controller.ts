import { FastifyInstance } from "fastify";
import {
  ProductDetailsSchema,
  ProductSchema,
  ProductWrite,
  ProductWriteSchema,
} from "./schema";
import * as queries from "./queries";
import * as uuid from "uuid";

type CreateRequest = {
  Body: ProductWrite & { count: number };
};

type ItemRequest = {
  Params: { id: string };
};

type ListRequest = {
  Querystring: {
    page?: number;
    category?: string;
  };
};

export const productsController = async (fastify: FastifyInstance) => {
  fastify.route<ListRequest>({
    method: "GET",
    url: "/product",
    schema: {
      tags: ["Product"],
      summary: "List Products",
      operationId: "ListProducts",
      querystring: {
        category: {
          type: "string",
        },
        page: {
          type: "number",
          default: 0,
        },
      },
      response: {
        200: {
          type: "array",
          items: ProductSchema,
        },
      },
    },
    handler: async (req, res) => {
      const result = req.query.category
        ? await queries.listProductsInCategory(
            req.query.category,
            req.query.page
          )
        : await queries.listAllProducts(req.query.page);
      res.send(result);
    },
  });

  fastify.route<CreateRequest>({
    method: "POST",
    url: "/product",
    schema: {
      tags: ["Product"],
      summary: "Create product",
      operationId: "CreateProduct",
      body: ProductWriteSchema,
      response: {
        201: ProductSchema,
      },
    },
    handler: async (req, res) => {
      const product = await queries.createProduct({
        id: uuid.v4(),
        name: req.body.name,
        category: req.body.category,
        inStock: req.body.count,
        createdBy: req.user.username,
        orders: [],
      });
      res.status(201).send(product);
    },
  });

  fastify.route<ItemRequest>({
    method: "DELETE",
    url: "/product/:id",
    schema: {
      tags: ["Product"],
      summary: "Delete product",
      operationId: "DeleteProduct",
      params: {
        id: { type: "string" },
      },
      response: {
        204: {},
      },
    },
    handler: async (req, res) => {
      await queries.deleteProduct(req.params.id);
      res.status(204).send();
    },
  });

  fastify.route<ItemRequest>({
    method: "GET",
    url: "/product/:id",
    schema: {
      tags: ["Product"],
      summary: "Get product",
      operationId: "GetProduct",
      params: {
        id: { type: "string" },
      },
      response: {
        200: ProductDetailsSchema,
        404: {},
      },
    },
    handler: async (req, res) => {
      const product = await queries.getProduct(req.params.id);
      if (!product) {
        res.status(404).send();
      }
      res.send(product);
    },
  });
};
