import CommentRepository from "#root/repositories/ticket/comment.repository.js";
import {
  createResourceHandler,
  deleteResourceHandler,
  getResourceHandler,
  updateResourceHandler,
  getResourcesHandler,
} from "../common-resource-handler.js";

const commentResource = {
  getAll: CommentRepository.getAll,
  getUnique: CommentRepository.getUnique,
  getMany: CommentRepository.getMany,
  create: CommentRepository.create,
  update: CommentRepository.update,
  delete: CommentRepository.delete,
  name: "comment",
};

export const getCommentsHandler = getResourcesHandler(commentResource);
export const getCommentHandler = getResourceHandler(commentResource);
export const createCommentHandler = createResourceHandler(commentResource);
export const updateCommentHandler = updateResourceHandler(commentResource);
export const deleteCommentHandler = deleteResourceHandler(commentResource);
