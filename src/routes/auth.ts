import { config } from "#root/config.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyPluginCallback } from "fastify/types/plugin.js";
import { telegramLoginHandler } from "#root/controllers/handlers/authenticate.js";

const APIRoute = {
  Login: "/login",
  TelegramLogin: "/telegram-login",
  Logout: "/logout",
} as const;

const getTelegramLoginOptions = {
  schema: {
    body: {
      type: "object",
      properties: {
        id: { type: "string" },
        first_name: { type: "string" },
        username: { type: "string" },
        photo_url: { type: "string" },
        auth_date: { type: "string" },
        hash: { type: "string" },
      },
      required: ["id", "first_name", "auth_date", "hash"],
    },
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
      403: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
  handler: telegramLoginHandler,
};

const getLoginOptions = {
  schema: {
    body: {
      type: "object",
      properties: {
        username: { type: "string" },
        password: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
      403: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
  handler: async (
    request: FastifyRequest<{
      Body: {
        username: string;
        password: string;
      };
    }>,
    reply: FastifyReply,
  ) => {
    if (
      request.body.username !== config.EXTERNAL_SERVICE_LOGIN ||
      request.body.password !== config.EXTERNAL_SERVICE_PASSWORD
    ) {
      return reply.code(403).send({ message: "Неправильные логин или пароль" });
    }

    const payload = {
      username: request.body.username,
    };

    const token = request.jwt.sign(payload);
    reply.setCookie("access_token", token, {
      path: "/",
      httpOnly: true,
      // secure: true,
    });
    reply.code(200).send({ message: "You are welcome" });
  },
};

export const authRouters: FastifyPluginCallback = (
  instance,
  _options,
  done,
) => {
  instance.post(APIRoute.Login, getLoginOptions);
  instance.post(APIRoute.TelegramLogin, getTelegramLoginOptions);

  instance.delete(APIRoute.Logout, (_request, reply) => {
    reply.clearCookie("access_token");

    return reply.send({ message: "Logout successful" });
  });

  done();
};
