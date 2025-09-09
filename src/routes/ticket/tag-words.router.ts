import { FastifyPluginCallback } from "fastify/types/plugin.js";
import { TagWord } from "@prisma/client";
import {
  createTagWordHandler,
  deleteTagWordHandler,
  getTagWordHandler,
  getTagWordsHandler,
  updateTagWordHandler,
} from "#root/controllers/handlers/ticket/tag-word.handler.js";
import {
  createTagWordSchema,
  deleteTagWordSchema,
  getTagWordSchema,
  getTagWordsSchema,
  updateTagWordSchema,
} from "#root/controllers/schemas/ticket/tag-word.schema.js";

import { APIRoute } from "./api-route.js";

const getTagWordsOptions = {
  schema: getTagWordsSchema,
  handler: getTagWordsHandler,
};

const getTagWordOptions = {
  schema: getTagWordSchema,
  handler: getTagWordHandler,
};

const createTagWordOptions = {
  schema: createTagWordSchema,
  handler: createTagWordHandler,
};

const updateTagWordOptions = {
  schema: updateTagWordSchema,
  handler: updateTagWordHandler,
};

const deleteTagWordOptions = {
  schema: deleteTagWordSchema,
  handler: deleteTagWordHandler,
};

export const tagWordRouters: FastifyPluginCallback = (
  instance,
  _options,
  done,
) => {
  instance.get(APIRoute.TagWord.All, getTagWordsOptions);

  instance.get<{
    Params: {
      id: string;
    };
  }>(APIRoute.TagWord.Info, getTagWordOptions);

  instance.post<{
    Body: TagWord;
  }>(APIRoute.TagWord.Create, createTagWordOptions);

  instance.put<{
    Body: TagWord;
  }>(APIRoute.TagWord.Update, updateTagWordOptions);

  instance.delete<{
    Params: {
      id: string;
    };
  }>(APIRoute.TagWord.Delete, deleteTagWordOptions);

  done();
};
