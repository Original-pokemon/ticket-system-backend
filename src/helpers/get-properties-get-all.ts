import { WhereType, getAllProperties } from "#root/types.js";

const getPropertiesGetAll = (
  properties: getAllProperties,
  include: object = {},
) => {
  const { id, start = 0, end, filter, sort } = properties;

  const where: WhereType = {};
  const orderBy: { [key: string]: string } = {};
  const take = end ? end - start : undefined;

  if (id) {
    where.id = { in: id };
  }

  if (filter) {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in filter) {
      if (Object.prototype.hasOwnProperty.call(filter, key)) {
        const value = filter[key];
        if (typeof value === "string") where[key] = { in: [value] };
        if (Array.isArray(value)) where[key] = { in: value };
      }
    }
  }

  if (sort && sort.sortBy) {
    orderBy[sort.sortBy] = sort.method.toLowerCase();
  }

  return {
    where,
    skip: start,
    take: take ? (take > 0 ? take : 0) : undefined,
    include,
  };
};

export default getPropertiesGetAll;
