import { FastifyPluginCallback } from "fastify/types/plugin.js";
import { Comment } from "@prisma/client";
import {
  createCommentHandler,
  deleteCommentHandler,
  getCommentHandler,
  getCommentsHandler,
  updateCommentHandler,
} from "#root/controllers/handlers/ticket/comment.handler.js";
import {
  createCommentSchema,
  deleteCommentSchema,
  getCommentSchema,
  getCommentsSchema,
  updateCommentSchema,
} from "#root/controllers/schemas/ticket/comment.schema.js";

import { APIRoute } from "./api-route.js";

const getCommentsOptions = {
  schema: getCommentsSchema,
  handler: getCommentsHandler,
};

const getCommentOptions = {
  schema: getCommentSchema,
  handler: getCommentHandler,
};

const createCommentOptions = {
  schema: createCommentSchema,
  handler: createCommentHandler,
};

const updateCommentOptions = {
  schema: updateCommentSchema,
  handler: updateCommentHandler,
};

const deleteCommentOptions = {
  schema: deleteCommentSchema,
  handler: deleteCommentHandler,
};

export const commentRouters: FastifyPluginCallback = (
  instance,
  _options,
  done,
) => {
  instance.get(APIRoute.Comment.All, getCommentsOptions);

  instance.get<{
    Params: {
      id: string;
    };
  }>(APIRoute.Comment.Info, getCommentOptions);

  instance.post<{
    Body: Comment;
  }>(APIRoute.Comment.Create, createCommentOptions);

  instance.put<{
    Body: Comment;
  }>(APIRoute.Comment.Update, updateCommentOptions);

  instance.delete<{
    Params: {
      id: string;
    };
  }>(APIRoute.Comment.Delete, deleteCommentOptions);

  done();
};
