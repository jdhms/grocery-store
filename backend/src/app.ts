import dotenv from "dotenv";
dotenv.config();

import fastify from "fastify";
import cors from "fastify-cors";
import swagger from "fastify-swagger";
import { parseUserHook } from "./auth";
import { productsController } from "./product";
import { ordersController } from "./order";
import { categoryController } from "./category";
import { errorHandler } from "./errors";

export const build = (opts = {}) => {
  const app = fastify({
    ...opts,
    exposeHeadRoutes: false,
  });

  // support cors for certain domains
  if (process.env.FRONTEND_DOMAIN) {
    app.register(cors, {
      origin: process.env.FRONTEND_DOMAIN,
    });
  }

  // generate swagger docs
  app.register(swagger, {
    exposeRoute: true,
    openapi: {
      info: {
        title: "Grocery store web app",
        description: "Azure RBAC in APIM",
        version: "0.1.0",
      },
    },
  });

  // get user info from jwt
  app.decorateRequest("user", null);
  app.addHook("onRequest", parseUserHook);

  // global error handler
  app.setErrorHandler(errorHandler);

  // register individual controllers
  app.register(productsController);
  app.register(ordersController);
  app.register(categoryController);
  return app;
};
