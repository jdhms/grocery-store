declare module "fastify" {
  interface PassportUser {
    username: string;
  }
}

export const AuthConfig = {
  CLIENT_ID: process.env.CLIENT_ID!,
  TENANT_ID: process.env.TENANT_ID!,
  AUDIENCE: process.env.CLIENT_ID!,
  AUTHORITY: "login.microsoftonline.com",
  DISCOVERY: ".well-known/openid-configuration",
  VERSION: "v2.0",
};
