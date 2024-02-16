/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyReply, FastifyRequest, RouteHandlerMethod } from "fastify";
import { handleErrors } from "#root/helpers/handle-error.js";

type Resource<Id> = {
  getAll: () => Promise<any[]>;
  getMany?: (data: Id[]) => Promise<any[]>;
  getUnique: (id: Id) => Promise<any>;
  create: (data: any) => Promise<any>;
  update: (data: any) => Promise<any>;
  delete: (id: Id) => Promise<any>;
  name: string;
};

function getResourcesHandler<Id>(resource: Resource<Id>): RouteHandlerMethod {
  return async (_request, reply) => {
    try {
      const data = await resource.getAll();
      reply.send(data);
    } catch (error) {
      handleErrors(reply, error, `Error fetching ${resource.name}s`);
    }
  };
}

function getManyResourcesHandler<Id>(resource: Resource<Id>) {
  return async (
    request: FastifyRequest<{
      Querystring: { ids: Id[] };
    }>,
    reply: FastifyReply,
  ) => {
    try {
      if (resource.getMany) {
        const { ids } = request.query;
        const items = await resource.getMany(ids);
        reply.send(items);
      } else {
        throw new Error("Method don`t implement");
      }
    } catch (error) {
      handleErrors(reply, error, `Error fetching ${resource.name}s`);
    }
  };
}

function getResourceHandler<Id>(resource: Resource<Id>) {
  return async (
    request: FastifyRequest<{
      Params: { id: Id };
    }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    try {
      const data = await resource.getUnique(id);
      if (!data) {
        return reply.code(404).send({ message: "Not found" });
      }
      reply.send(data);
    } catch (error) {
      handleErrors(reply, error, `Error fetching ${resource.name}`);
    }
  };
}

function createResourceHandler<Id, Data>(resource: Resource<Id>) {
  return async (
    request: FastifyRequest<{
      Body: Data;
    }>,
    reply: FastifyReply,
  ) => {
    try {
      const { body } = request;
      const data = await resource.create(body);
      reply.code(200).send(data);
    } catch (error) {
      handleErrors(reply, error, `Error creating ${resource.name}`);
    }
  };
}

function updateResourceHandler<Id, Data>(resource: Resource<Id>) {
  return async (
    request: FastifyRequest<{
      Body: Data;
    }>,
    reply: FastifyReply,
  ) => {
    try {
      const data = await resource.update(request.body);
      reply.code(200).send(data);
    } catch (error) {
      handleErrors(reply, error, `Error updating ${resource.name}`);
    }
  };
}

function deleteResourceHandler<Id>(resource: Resource<Id>) {
  return async (
    request: FastifyRequest<{
      Params: { id: Id };
    }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    try {
      const data = await resource.delete(id);
      reply.code(204).send(data);
    } catch (error) {
      handleErrors(reply, error, `Error deleting ${resource.name}`);
    }
  };
}

export {
  getResourcesHandler,
  createResourceHandler,
  deleteResourceHandler,
  getResourceHandler,
  updateResourceHandler,
  getManyResourcesHandler,
};
