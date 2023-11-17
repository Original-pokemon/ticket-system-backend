import { Attachment } from "@prisma/client";
import AttachmentRepository from "#root/repositories/ticket/attachment.repository.js";
import {
  createResourceHandler,
  deleteResourceHandler,
  getResourceHandler,
  getResourcesHandler,
  updateResourceHandler,
} from "../common-resource-handler.js";

const attachmentResource = {
  getAll: AttachmentRepository.getAll,
  getUnique: AttachmentRepository.getUnique,
  create: AttachmentRepository.create,
  update: AttachmentRepository.update,
  delete: AttachmentRepository.delete,
  name: "attachment",
};

export const getAttachmentsHandler =
  getResourcesHandler<string>(attachmentResource);

export const getAttachmentHandler =
  getResourceHandler<string>(attachmentResource);

export const createAttachmentHandler = createResourceHandler<
  string,
  Attachment
>(attachmentResource);

export const updateAttachmentHandler = updateResourceHandler<
  string,
  Attachment
>(attachmentResource);

export const deleteAttachmentHandler =
  deleteResourceHandler<string>(attachmentResource);
