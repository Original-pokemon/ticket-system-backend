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
  getMany: AttachmentRepository.getMany,
  create: AttachmentRepository.create,
  update: AttachmentRepository.update,
  delete: AttachmentRepository.delete,
  name: "attachment",
};

export const getAttachmentsHandler = getResourcesHandler(attachmentResource);

export const getAttachmentHandler = getResourceHandler(attachmentResource);

export const createAttachmentHandler =
  createResourceHandler<Attachment>(attachmentResource);

export const updateAttachmentHandler =
  updateResourceHandler<Attachment>(attachmentResource);

export const deleteAttachmentHandler =
  deleteResourceHandler(attachmentResource);
