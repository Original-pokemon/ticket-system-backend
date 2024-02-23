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
    const items = await this.client.comment.findMany(
      getPropertiesGetAll(properties, {
        attachments: true,
      }),
    );

    return items;
  };

  getUnique = async (id: string) => {
    const comment = await this.client.comment.findUnique({
      where: { id },
      include: {
        attachments: true,
      },
    });

    const attachmentIds =
      comment?.attachments.map(({ id: attachmentId }) => attachmentId) || [];

    return comment ? { ...comment, attachments: attachmentIds } : comment;
  };

  update = async (comment: Comment): Promise<Comment> => {
    const { id } = comment;
    const updateComment = await this.client.comment.update({
      data: comment,
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
