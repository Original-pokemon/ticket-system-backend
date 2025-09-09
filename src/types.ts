import { JWT } from "@fastify/jwt";

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    login: string;
  }
}

type SortMethodType = "ASC" | "DESC";

type SortType = {
  sortBy: string;
  method: SortMethodType;
};

type WhereType = {
  id?: { in: string[] };
  [key: string]: string | { in: string[] } | undefined;
};

type OrderByType = {
  [key: string]: SortMethodType;
};

type getAllProperties = {
  id?: string[];
  start?: number;
  end?: number;
  filter?: { [key: string]: string[] };
  sort?: SortType;
};

export type {
  SortMethodType,
  SortType,
  WhereType,
  OrderByType,
  getAllProperties,
};
