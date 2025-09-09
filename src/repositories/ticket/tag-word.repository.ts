import { TagWord } from "@prisma/client";
import { getAllProperties } from "#root/types.js";
import getPropertiesGetAll from "#root/helpers/get-properties-get-all.js";
import Repository from "../repository.js";

class TagWordRepository extends Repository {
  create = async (tagWord: TagWord): Promise<string> => {
    const { id } = await this.client.tagWord.create({
      data: tagWord,
    });
    return id;
  };

  getAll = async (properties: getAllProperties) => {
    const result = await this.client.tagWord.findManyAndCount(
      getPropertiesGetAll(properties),
    );

    return result;
  };

  getUnique = async (id: string): Promise<TagWord | null> => {
    const tagWord = await this.client.tagWord.findUnique({ where: { id } });
    return tagWord;
  };

  update = async ({ id, ...data }: TagWord): Promise<TagWord> => {
    const updateTagWord = await this.client.tagWord.update({
      data,
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
