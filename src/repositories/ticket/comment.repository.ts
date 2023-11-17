import { Comment } from "@prisma/client";
import Repository from "../repository.js";

class CommentRepository extends Repository {
  create = async (comment: Comment): Promise<Comment> => {
    const createdComment = await this.client.comment.create({
      data: comment,
    });
    return createdComment;
  };

  getAll = async (): Promise<Comment[]> => {
    const statusHistories = await this.client.comment.findMany();
    return statusHistories;
  };

  getUnique = async (id: string): Promise<Comment | null> => {
    const comment = await this.client.comment.findUnique({
      where: { id },
    });
    return comment;
  };

  update = async (comment: Comment): Promise<Comment> => {
    const { id } = comment;
    const updateComment = await this.client.comment.update({
      data: comment,
      where: { id },
    });
    return updateComment;
  };

  delete = async (id: string): Promise<Comment> => {
    const deleteComment = await this.client.comment.delete({
      where: { id },
    });
    return deleteComment;
  };
}

export default new CommentRepository();
