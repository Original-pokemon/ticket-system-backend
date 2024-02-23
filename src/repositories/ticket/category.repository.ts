import { Category } from "@prisma/client";
import { getAllProperties } from "#root/types.js";
import getPropertiesGetAll from "#root/helpers/get-properties-get-all.js";
import Repository from "../repository.js";

class CategoryRepository extends Repository {
  create = async (category: Category) => {
    const { id } = await this.client.category.create({
      data: category,
    });
    return id;
  };

  getAll = async (properties: getAllProperties) => {
    const items = await this.client.category.findMany(
      getPropertiesGetAll(properties),
    );

    return items;
  };

  getUnique = async (id: string) => {
    const category = await this.client.category.findUnique({
      where: { id },
      include: { task_performers: { select: { id: true } } },
    });

    const taskPerformerIds = category?.task_performers.map(
      (taskPerformer) => taskPerformer.id,
    );

    return { ...category, task_performers: taskPerformerIds };
  };

  update = async (category: Category): Promise<Category> => {
    const { id } = category;
    const updateCategory = await this.client.category.update({
      data: category,
      where: { id },
    });

    return updateCategory;
  };

  delete = async (id: string) => {
    const { id: deleteCategory } = await this.client.category.delete({
      where: { id },
    });

    return deleteCategory;
  };
}

export default new CategoryRepository();
