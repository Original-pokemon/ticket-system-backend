import { Priority } from "@prisma/client";
import Repository from "../repository.js";

class PriorityRepository extends Repository {
  create = async (priority: Priority): Promise<number> => {
    const { id } = await this.client.priority.create({
      data: priority,
    });
    return id;
  };

  getAll = async (): Promise<Priority[]> => {
    const priorities = await this.client.priority.findMany();
    return priorities;
  };

  getUnique = async (id: number): Promise<Priority | null> => {
    const priority = await this.client.priority.findUnique({
      where: { id },
    });
    return priority;
  };

  update = async (priority: Priority): Promise<Priority> => {
    const { id } = priority;
    const updatePriority = await this.client.priority.update({
      data: priority,
      where: { id },
    });
    return updatePriority;
  };

  delete = async (id: number): Promise<number> => {
    const { id: deletePriority } = await this.client.priority.delete({
      where: { id },
    });
    return deletePriority;
  };
}

export default new PriorityRepository();
