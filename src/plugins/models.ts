import * as schemas from "#root/controllers/schemas/models/index.js";
import fp from "fastify-plugin";

export const modelsPlugin = fp(async (fastify) => {
  const models = Object.values(schemas);

  [...models].map((schema) => fastify.addSchema(schema));
});
