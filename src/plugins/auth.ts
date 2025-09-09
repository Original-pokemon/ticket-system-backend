import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";
import { fastifyCookie } from "@fastify/cookie";
import fastifyJWT from "@fastify/jwt";
import { config } from "#root/config.js";

export const authPlugin = fp(async (fastify: FastifyInstance) => {
  // Регистрация fastify-jwt с настройками куки и секрета
  fastify.register(fastifyJWT, {
    cookie: {
      cookieName: "access_token",
      signed: false,
    },
    secret: config.JWT_SECRET,
    sign: {
      algorithm: "HS256", // Настройка алгоритма шифрования
    },
  });

  fastify.addHook("preHandler", (request, _reply, next) => {
    request.jwt = fastify.jwt;
    return next();
  });

  fastify.register(fastifyCookie, {
    secret: config.COOKIE_SECRET,
    hook: "preHandler",
  });
});
