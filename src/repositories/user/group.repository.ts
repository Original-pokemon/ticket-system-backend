import { Group } from "@prisma/client";
import Repository from "../repository.js";

class GroupRepository extends Repository {
  create = async (group: Group): Promise<Group> => {
    const createdGroup = await this.client.group.create({ data: group });
    return createdGroup;
  };

  getAll = async (): Promise<Group[]> => {
    const groups = await this.client.group.findMany();
    return groups;
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

  delete = async (id: string): Promise<Group> => {
    const deleteGroup = await this.client.group.delete({
      where: { id },
    });
    return deleteGroup;
  };
}

export default new GroupRepository();
