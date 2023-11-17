import userRepository from '#root/repositories/user/user.repository.js';
import { UserType } from '#root/types/user.js';
import { FastifyReply, FastifyRequest, RouteHandlerMethod } from 'fastify';

const getUsersHandler: RouteHandlerMethod = async (_request, reply) => {
  const users = await userRepository.getAll();

  reply.send(users);
};

const getUserHandler = async (
  request: FastifyRequest<{
    Params: {
      id: string;
    };
  }>,
  reply: FastifyReply,
) => {
  const { id } = request.params;
  const user = await userRepository.getUnique(id);

  reply.send(user);
};

const createUserHandler = async (
  request: FastifyRequest<{ Body: UserType }>,
  reply: FastifyReply,
) => {
  const { body } = request;
  const user = await userRepository.create(body);

  reply.send(user);
};

const updateUserHandler = async (
  request: FastifyRequest<{
    Body: UserType;
  }>,
  reply: FastifyReply,
) => {
  const user = await userRepository.update(request.body);

  reply.send(user);
};

const deleteUserHandler = async (
  request: FastifyRequest<{
    Body: { id: string };
  }>,
  reply: FastifyReply,
) => {
  const { id } = request.body;
  const user = await userRepository.delete(id);

  reply.send(user);
};

export {
  createUserHandler,
  deleteUserHandler,
  getUserHandler,
  getUsersHandler,
  updateUserHandler,
};
