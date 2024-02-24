import { FastifyJWT } from "@fastify/jwt";
import { FastifyReply, FastifyRequest } from "fastify";

export const authenticate = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const token = request.cookies.access_token;
  if (!token) {
    return reply.code(401).send({
      message: "Authentication required",
    });
  }
  const decoded = request.jwt.verify<FastifyJWT>(token);
  request.user = decoded;
};
