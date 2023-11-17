import groupRepository from '#root/repositories/user/group.repository.js';
import { GroupType } from '#root/types/user.js';
import { FastifyReply, FastifyRequest, RouteHandlerMethod } from 'fastify';

const getGroupsHandler: RouteHandlerMethod = async (_request, reply) => {
  const groups = await groupRepository.getAll();

  reply.send(groups);
};

const getGroupHandler = async (
  request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply,
) => {
  const { id } = request.params;
  const group = await groupRepository.getUnique(id);

  reply.send(group);
};

const createGroupHandler = async (
  request: FastifyRequest<{ Body: GroupType }>,
  reply: FastifyReply,
) => {
  const { body } = request;
  const group = await groupRepository.create(body);

  reply.send(group);
};

const updateGroupHandler = async (
  request: FastifyRequest<{
    Body: GroupType;
  }>,
  reply: FastifyReply,
) => {
  const group = await groupRepository.update(request.body);

  reply.send(group);
};

const deleteGroupHandler = async (
  request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply,
) => {
  const { id } = request.params;
  const group = await groupRepository.delete(id);

  reply.send(group);
};

export {
  createGroupHandler,
  deleteGroupHandler,
  getGroupHandler,
  getGroupsHandler,
  updateGroupHandler,
};
