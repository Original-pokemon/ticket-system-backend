import { Group } from "@prisma/client";
import { getAllProperties } from "#root/types.js";
import getPropertiesGetAll from "#root/helpers/get-properties-get-all.js";
import Repository from "../repository.js";

class GroupRepository extends Repository {
  create = async (group: Group): Promise<string> => {
    const { id } = await this.client.group.create({ data: group });
    return id;
  };

  getAll = async (properties: getAllProperties) => {
    const items = await this.client.group.findMany(
      getPropertiesGetAll(properties),
    );

    return items;
  };

  getUnique = async (id: string) => {
    const group = await this.client.group.findUnique({
      where: { id },
      include: { users: true },
    });

    if (group) {
      const users = group.users.map((user) => user.id);

      return { ...group, users };
    }

    return group;
  };

  update = async ({ id, ...data }: Group): Promise<Group> => {
    const updateGroup = await this.client.group.update({
      data,
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
