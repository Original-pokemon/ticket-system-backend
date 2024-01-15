import { Comment, Ticket } from "@prisma/client";
import { saveAttachments } from "#root/helpers/save-attachments.js";
import Repository from "../repository.js";

class TicketRepository extends Repository {
  create = async (
    ticket: Ticket & { user_id: string } & { attachments: string[] } & {
      comments: Comment[];
    },
  ): Promise<string> => {
    const { user_id, comments, ...ticket_ } = ticket;

    const attachments = await saveAttachments(ticket_.attachments);

    const { id } = await this.client.ticket.create({
      data: {
        ...ticket_,
        comments: {
          createMany: { data: comments },
        },
        status_history: {
          create: {
            user_id,
            ticket_status: ticket_.status_id,
          },
        },
        attachments: {
          createMany: { data: attachments },
        },
      },
    });

    return id;
  };

  getAll = async (): Promise<Ticket[]> => {
    const tickets = await this.client.ticket.findMany();
    return tickets;
  };

  getMany = async (data: string[]): Promise<Ticket[]> => {
    const tickets = await this.client.ticket.findMany({
      where: {
        id: {
          in: data,
        },
      },
    });

    return tickets;
  };

    const ticket = await this.client.ticket.findUnique({
      where: { id },
      include: {
        status_history: true,
        comments: true,
        author: true,
      },
    });
    return ticket;
  };

  update = async (
    ticket: Ticket & {
      status_history: { user_id: string; ticket_status: number };
    },
  ): Promise<Ticket> => {
    const { id, status_history, ticket_priority, ticket_category } = ticket;
    const { user_id, ticket_status } = status_history;
    const updateTicket = await this.client.ticket.update({
      data: {
        ticket_priority,
        ticket_category,
        status_history: { update: { user_id, ticket_status } },
      },
      where: { id },
    });
    return updateTicket;
  };

  delete = async (id: string): Promise<Ticket> => {
    const deleteTicket = await this.client.ticket.delete({
      where: { id },
    });
    return deleteTicket;
  };
}

export default new TicketRepository();
