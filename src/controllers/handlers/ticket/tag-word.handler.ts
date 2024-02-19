import { TagWord } from "@prisma/client";
import TagWordRepository from "#root/repositories/ticket/tag-word.repository.js";
import {
  createResourceHandler,
  deleteResourceHandler,
  getResourceHandler,
  getResourcesHandler,
  updateResourceHandler,
} from "../common-resource-handler.js";

const tagWordResource = {
  getAll: TagWordRepository.getAll,
  getUnique: TagWordRepository.getUnique,
  create: TagWordRepository.create,
  update: TagWordRepository.update,
  delete: TagWordRepository.delete,
  name: "tag-word",
};

export const getTagWordsHandler = getResourcesHandler(tagWordResource);

export const getTagWordHandler = getResourceHandler(tagWordResource);

export const createTagWordHandler =
  createResourceHandler<TagWord>(tagWordResource);

export const updateTagWordHandler =
  updateResourceHandler<TagWord>(tagWordResource);

export const deleteTagWordHandler = deleteResourceHandler(tagWordResource);
