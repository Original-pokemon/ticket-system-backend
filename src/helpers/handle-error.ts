import logger from "#root/logger.js";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library.js";
import { FastifyReply } from "fastify/types/reply.js";

export const handleErrors = (
  reply: FastifyReply,
  error: unknown,
  defaultMessage: string,
) => {
  if (error instanceof Error) {
    if (
      error instanceof PrismaClientValidationError ||
      error instanceof PrismaClientKnownRequestError
    ) {
      logger.error(error);
      reply.status(400).send({ message: defaultMessage });
    } else {
      logger.error(error);
      throw new Error(error.message);
    }
  } else {
    logger.error(error);
  }
};
