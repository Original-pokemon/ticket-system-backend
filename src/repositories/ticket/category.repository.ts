import { Category } from "@prisma/client";
import Repository from "../repository.js";

class CategoryRepository extends Repository {
  create = async (category: Category): Promise<number> => {
    const { id } = await this.client.category.create({
      data: category,
    });
    return id;
  };

  getAll = async (): Promise<Category[]> => {
    const categories = await this.client.category.findMany();
    return categories;
  };

  getUnique = async (id: number) => {
    const category = await this.client.category.findUnique({
      where: { id },
      include: { task_performers: { select: { user_id: true } } },
    });

    const taskPerformerIds = category?.task_performers.map(
      (taskPerformer) => taskPerformer.user_id,
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

  delete = async (id: number): Promise<number> => {
    const { id: deleteCategory } = await this.client.category.delete({
      where: { id },
    });

    return deleteCategory;
  };
}

export default new CategoryRepository();
