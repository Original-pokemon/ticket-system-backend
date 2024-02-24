import { config } from "#root/config.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyPluginCallback } from "fastify/types/plugin.js";

const APIRoute = {
  Login: "/login",
  Logout: "/logout",
} as const;

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
      request.body.username !== config.LOGIN ||
      request.body.password !== config.PASSWORD
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
      secure: true,
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

  instance.delete(APIRoute.Logout, (_request, reply) => {
    reply.clearCookie("access_token");

    return reply.send({ message: "Logout successful" });
  });

  done();
};
