import { Priority } from "@prisma/client";
import { getAllProperties } from "#root/types.js";
import getPropertiesGetAll from "#root/helpers/get-properties-get-all.js";
import Repository from "../repository.js";

class PriorityRepository extends Repository {
  create = async (priority: Priority) => {
    const { id } = await this.client.priority.create({
      data: priority,
    });
    return id;
  };

  getAll = async (properties: getAllProperties) => {
    const items = await this.client.priority.findMany(
      getPropertiesGetAll(properties),
    );

    return items;
  };

  getUnique = async (id: string): Promise<Priority | null> => {
    const priority = await this.client.priority.findUnique({
      where: { id },
    });
    return priority;
  };

  update = async (priority: Priority) => {
    const { id } = priority;
    const updatePriority = await this.client.priority.update({
      data: priority,
      where: { id },
    });
    return updatePriority;
  };

  delete = async (id: string) => {
    const { id: deletePriority } = await this.client.priority.delete({
      where: { id },
    });
    return deletePriority;
  };
}

export default new PriorityRepository();
