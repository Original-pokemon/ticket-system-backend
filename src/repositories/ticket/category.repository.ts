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
    const result = await this.client.category.findManyAndCount(
      getPropertiesGetAll(properties),
    );

    return result;
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

  update = async ({ id, ...data }: Category): Promise<Category> => {
    const updateCategory = await this.client.category.update({
      data,
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
