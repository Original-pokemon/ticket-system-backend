import { PrismaClient } from "@prisma/client";

class DataBase {
  prisma?: PrismaClient;

  get client() {
    if (this.prisma) {
      return this.prisma;
    }
    throw new Error("client is not initialized");
  }

  init() {
    if (process.env.NODE_ENV === "production") {
      this.prisma = new PrismaClient();
    } else if (!this.prisma) {
      this.prisma = new PrismaClient();
    }
    return true;
  }

  async disconnect() {
    if (this.prisma) {
      try {
        await this.prisma.$disconnect();
        return true;
      } catch {
        throw new Error("Error disconnecting client");
      }
    }
  }
}

export default DataBase;
