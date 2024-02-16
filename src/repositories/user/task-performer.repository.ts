/* eslint-disable camelcase */
import { TaskPerformer } from "@prisma/client";
import Repository from "../repository.js";

class TaskPerformerRepository extends Repository {
  create = async (taskPerformer: TaskPerformer): Promise<string> => {
    const { user_id } = await this.client.taskPerformer.create({
      data: taskPerformer,
    });
    return user_id;
  };

  getAll = async (): Promise<TaskPerformer[]> => {
    const taskPerformer = await this.client.taskPerformer.findMany();
    return taskPerformer;
  };

  getUnique = async (user_id: string) => {
    const taskPerformer = await this.client.taskPerformer.findUnique({
      where: { user_id },
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
    const { user_id } = taskPerformer;
    const updateTaskPerformer = await this.client.taskPerformer.update({
      data: taskPerformer,
      where: { user_id },
    });

    return updateTaskPerformer;
  };

  delete = async (user_id: string): Promise<string> => {
    const { user_id: id } = await this.client.taskPerformer.delete({
      where: { user_id },
    });
    return id;
  };
}

export default new TaskPerformerRepository();
