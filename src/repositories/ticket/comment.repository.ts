import { Comment } from "@prisma/client";
import { saveAttachments } from "#root/helpers/save-attachments.js";
import { getAllProperties } from "#root/types.js";
import getPropertiesGetAll from "#root/helpers/get-properties-get-all.js";
import Repository from "../repository.js";

class CommentRepository extends Repository {
  create = async (
    comment: Comment & { attachments: string[] },
  ): Promise<string> => {
    const attachments = await saveAttachments(comment.attachments);

    const { id } = await this.client.comment.create({
      data: {
        ...comment,
        attachments: {
          createMany: {
            data: attachments,
          },
        },
      },
    });
    return id;
  };

  getAll = async (properties: getAllProperties) => {
    const result = await this.client.comment.findManyAndCount(
      getPropertiesGetAll(properties, {
        attachments: true,
      }),
    );

    return result;
  };

  getUnique = async (id: string) => {
    const comment = await this.client.comment.findUnique({
      where: { id },
      include: {
        attachments: true,
      },
    });

    return comment;
  };

  update = async ({ id, ...data }: Comment): Promise<Comment> => {
    const updateComment = await this.client.comment.update({
      data,
      where: { id },
    });
    return updateComment;
  };

  delete = async (id: string): Promise<string> => {
    const { id: deleteCommentId } = await this.client.comment.delete({
      where: { id },
    });
    return deleteCommentId;
  };
}

export default new CommentRepository();
