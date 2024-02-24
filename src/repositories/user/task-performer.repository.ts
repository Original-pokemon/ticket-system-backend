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
    const items = await this.client.taskPerformer.findMany(
      getPropertiesGetAll(properties, { user: true }),
    );

    return items;
  };

  getUnique = async (id: string) => {
    const taskPerformer = await this.client.taskPerformer.findUnique({
      where: { id },
      include: {
        category: {
          include: {
            tickets: {
              select: {
                id: true,
              },
            },
          },
        },
        user: true,
      },
    });

    if (taskPerformer) {
      return {
        ...taskPerformer,
        tickets: taskPerformer.category?.tickets.map((ticket) => ticket.id),
      };
    }

    return taskPerformer;
  };

  update = async (taskPerformer: TaskPerformer): Promise<TaskPerformer> => {
    const { id } = taskPerformer;
    const updateTaskPerformer = await this.client.taskPerformer.update({
      data: taskPerformer,
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
