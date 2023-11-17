import dataBase from "#root/services/database/index.js";
import { UserType } from "#root/types/user.js";

import { PrismaClient } from "@prisma/client";

class User {
  client: PrismaClient;

  constructor() {
    this.client = dataBase.client;
  }

  async create(user: UserType): Promise<UserType> {
    const createdUser = await this.client.user.create({ data: user });

    return createdUser;
  }

  async getAll(): Promise<UserType[]> {
    const users = await this.client.user.findMany();

    return users;
  }

  async getUnique(id: string): Promise<UserType | null> {
    const user = await this.client.user.findUnique({ where: { id } });
    return user;
  }

  async update(user: UserType): Promise<UserType> {
    const { id } = user;
    const updatedUser = await this.client.user.update({
      data: user,
      where: { id },
    });

    return updatedUser;
  }

  async delete(id: string): Promise<UserType> {
    const deleteUser = await this.client.user.delete({
      where: { id },
    });

    return deleteUser;
  }
}

export default new User();
