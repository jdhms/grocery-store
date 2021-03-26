import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

declare module "fastify" {
  interface FastifyRequest {
    user: {
      username: string;
      name: string;
    };
  }
}

// rely on APIM for jwt validation
export const parseJwt = (req: FastifyRequest) => {
  const header = req.headers.authorization;

  // no authorization header
  if (!header) {
    return null;
  }

  // not valid bearer format
  const parts = header.split(" ");
  if (parts.length !== 2) {
    return null;
  }

  const token = parts[1];
  const user = jwt.decode(token);

  // bad token
  if (!user || typeof user === "string") {
    return null;
  }

  // missing expected properties
  const { name, preferred_username } = user;
  if (!name || !preferred_username) {
    return null;
  }

  return { name, username: preferred_username };
};

export const parseUserHook = (
  req: FastifyRequest,
  reply: FastifyReply,
  done: CallableFunction
) => {
  const user = parseJwt(req);
  if (!user) {
    reply.status(401).send();
  } else {
    req.user = user;
  }
  done();
};
