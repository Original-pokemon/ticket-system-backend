/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyReply, FastifyRequest } from "fastify";
import { handleErrors } from "#root/helpers/handle-error.js";
import { SortMethodType, getAllProperties } from "#root/types.js";

type Resource = {
  getAll: (properties: getAllProperties) => Promise<[any[], number]>;
  getUnique: (id: string) => Promise<any>;
  create: (data: any) => Promise<any>;
  update: (data: any) => Promise<any>;
  delete: (id: string) => Promise<any>;
  name: string;
};

function getResourcesHandler(resource: Resource) {
  return async (
    request: FastifyRequest<{
      Querystring: {
        id: string[];
        _sort: string;
        _order: SortMethodType;
        _start: string;
        _end: string;
      };
    }>,
    reply: FastifyReply,
  ) => {
    const {
      id,
      _sort,
      _order,
      _start: start,
      _end: end,
      ...filter
    } = request.query;

    const queryParameters = {
      filter,
      id,
      sort: { sortBy: _sort, method: _order },
      start: Number(start) || undefined,
      end: Number(end) || undefined,
    };

    try {
      const [data, count] = await resource.getAll(queryParameters);
      reply.header("x-total-count", count);
      reply.send(data);
    } catch (error) {
      handleErrors(reply, error, `Error fetching ${resource.name}s`);
    }
  };
}

function getResourceHandler(resource: Resource) {
  return async (
    request: FastifyRequest<{
      Params: { id: string };
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

function createResourceHandler<Data>(resource: Resource) {
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

function updateResourceHandler<Data>(resource: Resource) {
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

function deleteResourceHandler(resource: Resource) {
  return async (
    request: FastifyRequest<{
      Params: { id: string };
    }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    try {
      const data = await resource.delete(id);
      reply.code(200).send(data);
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
};
