import { TagWord } from "@prisma/client";
import Repository from "../repository.js";

class TagWordRepository extends Repository {
  create = async (tagWord: TagWord): Promise<TagWord> => {
    const createdTagWord = await this.client.tagWord.create({
      data: tagWord,
    });
    return createdTagWord;
  };

  getAll = async (): Promise<TagWord[]> => {
    const categories = await this.client.tagWord.findMany();
    return categories;
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

  delete = async (id: string): Promise<TagWord> => {
    const deleteTagWord = await this.client.tagWord.delete({
      where: { id },
    });

    return deleteTagWord;
  };
}

export default new TagWordRepository();
