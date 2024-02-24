import { FastifySchema } from "fastify";

export const createRouteSchema = (schemaOptions: {
  tags?: string[];
  params?: object;
  querystring?: object;
  body?: object;
  response?: object;
}) => {
  const { tags, params, querystring, body, response } = schemaOptions;
  const schema: FastifySchema = {
    tags: tags ?? [],

    response: {
      401: { $ref: "notAuthorizedUser" },
      ...response,
    },
  };

  if (params) {
    schema.params = params;
  }

  if (querystring) {
    schema.querystring = querystring;
  }

  if (body) {
    schema.body = body;
  }

  return schema;
};
