/* eslint-disable camelcase */
import { TaskPerformer } from "@prisma/client";
import { OrderByType, WhereType, getAllProperties } from "#root/types.js";
import Repository from "../repository.js";

class TaskPerformerRepository extends Repository {
  create = async (taskPerformer: TaskPerformer): Promise<string> => {
    const { id } = await this.client.taskPerformer.create({
      data: taskPerformer,
    });
    return id;
  };

  getAll = async (properties: getAllProperties) => {
    const { idList, start = 0, end, filter, sort } = properties;

    const where: WhereType = {};
    const orderBy: OrderByType = {};

    if (idList) {
      where.id = { in: idList };
    }

    if (filter && filter.key && filter.value) {
      where[filter.key] = filter.value;
    }

    if (sort && sort.orderBy) {
      orderBy[sort.orderBy] = sort.sort;
    }

    const items = await this.client.taskPerformer.findMany({
      where,
      skip: start,
      take: end ? end - start : undefined,
      orderBy,
      include: {
        user: true,
      },
    });

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
