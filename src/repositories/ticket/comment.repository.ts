import { Comment } from "@prisma/client";
import { saveAttachments } from "#root/helpers/save-attachments.js";
import Repository from "../repository.js";
import { OrderByType, WhereType, getAllProperties } from "../types.js";

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

    const items = await this.client.comment.findMany({
      where,
      skip: start,
      take: end ? end - start : undefined,
      orderBy,
    });

    return items;
  };

  getMany = async (data: string[]): Promise<Comment[]> => {
    const comments = await this.client.comment.findMany({
      where: {
        id: {
          in: data,
        },
      },
      include: {
        attachments: true,
      },
    });

    return comments.map((comment) => {
      const attachmentIds = comment.attachments.map(
        (attachment) => attachment.id,
      );
      return { ...comment, attachments: attachmentIds };
    });
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
