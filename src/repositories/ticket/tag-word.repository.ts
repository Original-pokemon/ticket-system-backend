import { TagWord } from "@prisma/client";
import Repository from "../repository.js";
import { OrderByType, WhereType, getAllProperties } from "../types.js";

class TagWordRepository extends Repository {
  create = async (tagWord: TagWord): Promise<string> => {
    const { id } = await this.client.tagWord.create({
      data: tagWord,
    });
    return id;
  };

  getAll = async (properties: getAllProperties) => {
    const { ids, start = 0, end, filter, sort } = properties;

    const where: WhereType = {};
    const orderBy: OrderByType = {};

    if (ids) {
      where.id = { in: ids };
    }

    if (filter && filter.key && filter.value) {
      where[filter.key] = filter.value;
    }

    if (sort && sort.orderBy) {
      orderBy[sort.orderBy] = sort.sort;
    }

    const items = await this.client.tagWord.findMany({
      where,
      skip: start,
      take: end ? end - start : undefined,
      orderBy,
    });

    return items;
  };

  getUnique = async (id: string): Promise<TagWord | null> => {
    const tagWord = await this.client.tagWord.findUnique({ where: { id } });
    return tagWord;
  };

  update = async (tagWord: TagWord): Promise<TagWord> => {
    const { id } = tagWord;
    const updateTagWord = await this.client.tagWord.update({
      data: tagWord,
      where: { id },
    });

    return updateTagWord;
  };

  delete = async (id: string): Promise<string> => {
    const { id: tagWordId } = await this.client.tagWord.delete({
      where: { id },
    });

    return tagWordId;
  };
}

export default new TagWordRepository();
