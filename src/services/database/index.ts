import { PrismaClient } from "@prisma/client";

class DataBase {
  private database: PrismaClient = new PrismaClient();

  get client() {
    return this.database;
  }

  async init() {
    try {
      await this.database.$connect();

      return this.database;
    } catch {
      throw new Error(`Error initializing database`);
    }
  }

  async disconnect() {
    if (this.database) {
      try {
        await this.database.$disconnect();
        return true;
      } catch {
        throw new Error("Error disconnecting client");
      }
    }
  }
}

export default new DataBase();
