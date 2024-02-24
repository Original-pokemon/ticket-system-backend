import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";
import { fastifyCookie } from "@fastify/cookie";
import fastifyJWT from "@fastify/jwt";
import { config } from "#root/config.js";

export const authPlugin = fp(async (fastify: FastifyInstance) => {
  fastify.register(fastifyJWT, {
    cookie: {
      cookieName: "access_token",
      signed: false,
    },
    secret: config.SECRET,
  });

  fastify.addHook("preHandler", (request, _reply, next) => {
    request.jwt = fastify.jwt;
    return next();
  });

  fastify.register(fastifyCookie, {
    secret: config.SECRET_COOKIE,
    hook: "preHandler",
  });
});
