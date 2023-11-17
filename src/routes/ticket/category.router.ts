import { FastifyPluginCallback } from "fastify/types/plugin.js";
import { Category } from "@prisma/client";
import {
  createCategoryHandler,
  deleteCategoryHandler,
  getCategoryHandler,
  getCategoriesHandler,
  updateCategoryHandler,
} from "#root/controllers/handlers/ticket/category.handler.js";
import {
  createCategorySchema,
  deleteCategorySchema,
  getCategorySchema,
  getCategoriesSchema,
  updateCategorySchema,
} from "#root/controllers/schemas/ticket/category.schema.js";

import { APIRoute } from "./api-route.js";

const getCategoriesOptions = {
  schema: getCategoriesSchema,
  handler: getCategoriesHandler,
};

const getCategoryOptions = {
  schema: getCategorySchema,
  handler: getCategoryHandler,
};

const createCategoryOptions = {
  schema: createCategorySchema,
  handler: createCategoryHandler,
};

const updateCategoryOptions = {
  schema: updateCategorySchema,
  handler: updateCategoryHandler,
};

const deleteCategoryOptions = {
  schema: deleteCategorySchema,
  handler: deleteCategoryHandler,
};

export const categoryRouters: FastifyPluginCallback = (
  instance,
  _options,
  done,
) => {
  instance.get(APIRoute.Category.All, getCategoriesOptions);

  instance.get<{
    Params: {
      id: number;
    };
  }>(APIRoute.Category.Info, getCategoryOptions);

  instance.post<{
    Body: Category;
  }>(APIRoute.Category.Create, createCategoryOptions);

  instance.put<{
    Body: Category;
  }>(APIRoute.Category.Update, updateCategoryOptions);

  instance.delete<{
    Params: {
      id: number;
    };
  }>(APIRoute.Category.Delete, deleteCategoryOptions);

  done();
};
