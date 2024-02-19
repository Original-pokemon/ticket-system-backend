import { Group } from "@prisma/client";
import { OrderByType, WhereType, getAllProperties } from "#root/types.js";
import Repository from "../repository.js";

class GroupRepository extends Repository {
  create = async (group: Group): Promise<string> => {
    const { id } = await this.client.group.create({ data: group });
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

    const items = await this.client.group.findMany({
      where,
      skip: start,
      take: end ? end - start : undefined,
      orderBy,
    });

    return items;
  };

  getUnique = async (id: string): Promise<Group | null> => {
    const group = await this.client.group.findUnique({ where: { id } });
    return group;
  };

  update = async (group: Group): Promise<Group> => {
    const { id } = group;
    const updateGroup = await this.client.group.update({
      data: group,
      where: { id },
    });
    return updateGroup;
  };

  delete = async (id: string): Promise<string> => {
    const { id: deletedGroupId } = await this.client.group.delete({
      where: { id },
    });
    return deletedGroupId;
  };
}

export default new GroupRepository();
