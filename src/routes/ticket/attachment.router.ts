import { FastifyPluginCallback } from "fastify/types/plugin.js";
import { Attachment } from "@prisma/client";
import {
  createAttachmentSchema,
  deleteAttachmentSchema,
  getAttachmentSchema,
  getAttachmentsSchema,
  getSelectAttachmentsSchema,
  updateAttachmentSchema,
} from "#root/controllers/schemas/ticket/attachment.schema.js";
import {
  createAttachmentHandler,
  deleteAttachmentHandler,
  getAttachmentHandler,
  getAttachmentsHandler,
  getSelectAttachmentsHandler,
  updateAttachmentHandler,
} from "#root/controllers/handlers/ticket/attachment.handler.js";

import { APIRoute } from "./api-route.js";

const getAttachmentsOptions = {
  schema: getAttachmentsSchema,
  handler: getAttachmentsHandler,
};

const getSelectAttachmentsOptions = {
  schema: getSelectAttachmentsSchema,
  handler: getSelectAttachmentsHandler,
};

const getAttachmentOptions = {
  schema: getAttachmentSchema,
  handler: getAttachmentHandler,
};

const createAttachmentOptions = {
  schema: createAttachmentSchema,
  handler: createAttachmentHandler,
};

const updateAttachmentOptions = {
  schema: updateAttachmentSchema,
  handler: updateAttachmentHandler,
};

const deleteAttachmentOptions = {
  schema: deleteAttachmentSchema,
  handler: deleteAttachmentHandler,
};

export const attachmentRouters: FastifyPluginCallback = (
  instance,
  _options,
  done,
) => {
  instance.get(APIRoute.Attachment.All, getAttachmentsOptions);

  instance.get(APIRoute.Attachment.Many, getSelectAttachmentsOptions);

  instance.get<{
    Params: {
      id: string;
    };
  }>(APIRoute.Attachment.Info, getAttachmentOptions);

  instance.post<{
    Body: Attachment;
  }>(APIRoute.Attachment.Create, createAttachmentOptions);

  instance.put<{
    Body: Attachment;
  }>(APIRoute.Attachment.Update, updateAttachmentOptions);

  instance.delete<{
    Params: {
      id: string;
    };
  }>(APIRoute.Attachment.Delete, deleteAttachmentOptions);

  done();
};
