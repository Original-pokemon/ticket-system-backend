import CategoryRepository from "#root/repositories/ticket/category.repository.js";
import { Category } from "@prisma/client";
import {
  createResourceHandler,
  deleteResourceHandler,
  getResourceHandler,
  updateResourceHandler,
  getResourcesHandler,
} from "../common-resource-handler.js";

const categoryResource = {
  getAll: CategoryRepository.getAll,
  getUnique: CategoryRepository.getUnique,
  create: CategoryRepository.create,
  update: CategoryRepository.update,
  delete: CategoryRepository.delete,
  name: "category",
};

export const getCategoriesHandler =
  getResourcesHandler<number>(categoryResource);
export const getCategoryHandler = getResourceHandler<number>(categoryResource);
export const createCategoryHandler = createResourceHandler<number, Category>(
  categoryResource,
);
export const updateCategoryHandler = updateResourceHandler<number, Category>(
  categoryResource,
);
export const deleteCategoryHandler =
  deleteResourceHandler<number>(categoryResource);
