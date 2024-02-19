import { Priority } from "@prisma/client";
import { OrderByType, WhereType, getAllProperties } from "#root/types.js";
import Repository from "../repository.js";

class PriorityRepository extends Repository {
  create = async (priority: Priority) => {
    const { id } = await this.client.priority.create({
      data: priority,
    });
    return id;
  };

  getAll = async (properties: getAllProperties) => {
    const { id, start = 0, end, filter, sort } = properties;

    const where: WhereType = {};
    const orderBy: OrderByType = {};

    if (id) {
      where.id = { in: id };
    }

    if (filter && filter.key && filter.value) {
      where[filter.key] = filter.value;
    }

    if (sort && sort.orderBy) {
      orderBy[sort.orderBy] = sort.sort;
    }

    const items = await this.client.priority.findMany({
      where,
      skip: start,
      take: end ? end - start : undefined,
      orderBy,
    });

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
