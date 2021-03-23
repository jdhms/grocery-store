export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class ConflictError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "ConflictError";
  }
}

export class BadRequestError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "BadRequestError";
  }
}

export class TokenError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "TokenError";
  }
}

export const errorHandler = async (error: Error, _: any, reply: any) => {
  switch (error.name) {
    case "NotFoundError":
      reply.status(404).send({ ok: false });
      break;
    case "ConflictError":
      reply.status(409).send({ ok: false });
      break;
    case "BadRequestError":
    case "TokenError":
      reply.status(400).send({ ok: false });
      break;
    default:
      console.error(error);
      reply.status(500).send({ ok: false });
  }
};
