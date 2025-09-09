import logger from "#root/logger.js";
import { PrismaClient, Prisma } from "@prisma/client";

class DataBase {
  private database;

  constructor() {
    const prisma = new PrismaClient().$extends({
      name: "findManyAndCount",
      model: {
        $allModels: {
          findManyAndCount<Model, Arguments>(
            this: Model,
            arguments_: Prisma.Exact<Arguments, Prisma.Args<Model, "findMany">>,
          ): Promise<[Prisma.Result<Model, Arguments, "findMany">, number]> {
            return prisma.$transaction([
              (this as any).findMany(arguments_),
              (this as any).count({ where: (arguments_ as any).where }),
            ]) as any;
          },
        },
      },
    });

    this.database = prisma;
  }

  get client() {
    return this.database;
  }

  async init() {
    try {
      await this.database.$connect();

      logger.info("Database initialized");
      return this.database;
    } catch (error) {
      throw new Error(`Error initializing database\n${error}`);
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
