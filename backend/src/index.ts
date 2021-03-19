import { build } from "./app";

const FASTIFY_PORT = Number(process.env.PORT) || 3000;

const server = build({
  logger: {
    level: "info",
  },
});

// Start server
server.listen(FASTIFY_PORT, "0.0.0.0");
console.log(`rbacgrocerystore-api listening on port ${FASTIFY_PORT}`);
