type FilterType = {
  key: string;
  value: string;
};

type SortMethodType = "ASC" | "DESC";

type SortType = {
  orderBy: string;
  sort: SortMethodType;
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
  filter?: FilterType;
  sort?: SortType;
};

export type {
  FilterType,
  SortMethodType,
  SortType,
  WhereType,
  OrderByType,
  getAllProperties,
};
