import { FastifyJWT } from "@fastify/jwt";
import { FastifyReply, FastifyRequest } from "fastify";
import userRepository from "#root/repositories/user/user.repository.js";
import {
  verifyTelegramAuth,
  isAuthDateValid,
  TelegramAuthData,
} from "#root/helpers/verify-telegram-auth.js";
import { config } from "#root/config.js";

export const authenticate = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    await request.jwtVerify();
  } catch {
    reply.code(401).send({ message: "Authentication required" });
  }

  const token = request.cookies.access_token;

  if (!token) {
    return reply.code(401).send({
      message: "Authentication required",
    });
  }
  const decoded = request.jwt.verify<FastifyJWT>(token);
  request.user = decoded;
};

export const telegramLoginHandler = async (
  request: FastifyRequest<{
    Body: TelegramAuthData;
  }>,
  reply: FastifyReply,
) => {
  const data = request.body;

  // Verify hash
  if (!verifyTelegramAuth(config.TELEGRAM_BOT_TOKEN, data)) {
    return reply.code(403).send({ message: "Invalid Telegram authentication" });
  }

  // Check auth_date
  if (!isAuthDateValid(data.auth_date)) {
    return reply.code(403).send({ message: "Authentication data is too old" });
  }

  // Check if user exists
  const user = await userRepository.getUnique(data.id);
  if (!user) {
    return reply.code(403).send({ message: "User not found" });
  }

  // Create JWT
  const payload = {
    userId: data.id,
  };

  const token = request.jwt.sign(payload);
  reply.setCookie("access_token", token, {
    path: "/",
    httpOnly: true,
    // secure: true,
  });
  reply.code(200).send({ message: "You are welcome" });
};
