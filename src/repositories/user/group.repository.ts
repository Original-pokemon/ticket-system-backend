import dataBase from "#root/services/database/index.js";
import { GroupType } from "#root/types/user.js";

import { PrismaClient } from "@prisma/client";

class Group {
  client: PrismaClient;

  constructor() {
    this.client = dataBase.client;
  }

  async create(group: GroupType): Promise<GroupType> {
    const createdGroup = await this.client.group.create({ data: group });

    return createdGroup;
  }

  async getAll(): Promise<GroupType[]> {
    const groups = await this.client.group.findMany();

    return groups;
  }

  async getUnique(id: string): Promise<GroupType | null> {
    const group = await this.client.group.findUnique({ where: { id } });
    return group;
  }

  async update(group: GroupType): Promise<GroupType> {
    const { id } = group;
    const updateGroup = await this.client.group.update({
      data: group,
      where: { id },
    });

    return updateGroup;
  }

  async delete(id: string): Promise<GroupType> {
    const deleteGroup = await this.client.group.delete({
      where: { id },
    });

    return deleteGroup;
  }
}

export default new Group();
