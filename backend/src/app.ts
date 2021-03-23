import dotenv from "dotenv";
dotenv.config();

import fastify from "fastify";
import cors from "fastify-cors";
import swagger from "fastify-swagger";
import { productsController } from "./product";
import { ordersController } from "./order";
import { categoryController } from "./category";
import { errorHandler } from "./errors";
import { AuthConfig } from "./config";
import fastifyPassport from "fastify-passport";
import fastifySecureSession from "fastify-secure-session";
import { BearerStrategy } from "passport-azure-ad";
import { Strategy as AnonymousStrategy } from "passport-anonymous";

const bearerStratgey = new BearerStrategy(
  {
    identityMetadata: `https://${AuthConfig.AUTHORITY}/${AuthConfig.TENANT_ID}/${AuthConfig.DISCOVERY}`,
    clientID: AuthConfig.CLIENT_ID,
    audience: AuthConfig.AUDIENCE,
    validateIssuer: false,
    loggingLevel: "warn",
    loggingNoPII: false,
  },
  (token, done) => {
    done(
      null,
      {
        username: token.preferred_username,
      },
      token
    );
  }
);

const anonymousStrategy = new AnonymousStrategy();

export const build = (opts = {}) => {
  const app = fastify({
    ...opts,
    exposeHeadRoutes: false
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

  app.register(fastifySecureSession, {
    key: process.env.SESSION_KEY!,
  });
  app.register(fastifyPassport.initialize());
  app.register(fastifyPassport.secureSession());
  fastifyPassport.use("bearer", bearerStratgey);
  fastifyPassport.use("anonymous", anonymousStrategy);

  // global error handler
  app.setErrorHandler(errorHandler);

  // register individual controllers
  app.register(productsController);
  app.register(ordersController);
  app.register(categoryController);
  return app;
};
