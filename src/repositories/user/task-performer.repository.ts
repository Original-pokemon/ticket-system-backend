/* eslint-disable camelcase */
import { TaskPerformer } from "@prisma/client";
import { getAllProperties } from "#root/types.js";
import getPropertiesGetAll from "#root/helpers/get-properties-get-all.js";
import Repository from "../repository.js";

class TaskPerformerRepository extends Repository {
  create = async (taskPerformer: TaskPerformer): Promise<string> => {
    const { id } = await this.client.taskPerformer.create({
      data: taskPerformer,
    });
    return id;
  };

  getAll = async (properties: getAllProperties) => {
    const result = await this.client.taskPerformer.findManyAndCount(
      getPropertiesGetAll(properties, { user: true }),
    );

    return result;
  };

  getUnique = async (id: string) => {
    const taskPerformer = await this.client.taskPerformer.findUnique({
      where: { id },
      include: {
        category: {
          include: {
            tickets: true,
          },
        },
      },
    });

    if (taskPerformer) {
      return {
        ...taskPerformer,
        tickets: taskPerformer.category?.tickets.map((ticket) => ticket),
      };
    }

    return taskPerformer;
  };

  update = async ({ id, ...data }: TaskPerformer): Promise<TaskPerformer> => {
    const { bush_id, category_id } = data;
    if (!bush_id || !category_id) {
      throw new Error("bush_id and category_id are required");
    }

    const updateTaskPerformer = await this.client.taskPerformer.update({
      data: {
        bush: {
          connect: {
            id: bush_id,
          },
        },
        category: {
          connect: {
            id: category_id,
          },
        },
      },
      where: { id },
      include: {
        user: true,
      },
    });

    return updateTaskPerformer;
  };

  delete = async (id: string): Promise<string> => {
    const { id: deletedTaskPerformerId } =
      await this.client.taskPerformer.delete({
        where: { id },
      });
    return deletedTaskPerformerId;
  };
}

export default new TaskPerformerRepository();
