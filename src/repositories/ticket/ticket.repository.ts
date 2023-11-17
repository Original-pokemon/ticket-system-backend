import { Attachment, Comment, Ticket } from "@prisma/client";
import Repository from "../repository.js";

class TicketRepository extends Repository {
  create = async (ticket: Ticket & Comment & Attachment): Promise<Ticket> => {
    const createdTicket = await this.client.ticket.create({
      data: {
        ...ticket,
        status_history: {
          create: {
            user_id: ticket.author_id,
            ticket_status: 1,
          },
        },
        comments: {
          create: {
            user_id: ticket.user_id,
            text: ticket.text,
            attachments: {
              create: {
                path: ticket.path,
              },
            },
          },
        },
      },
    });
    return createdTicket;
  };

  getAll = async (): Promise<Ticket[]> => {
    const tickets = await this.client.ticket.findMany();
    return tickets;
  };

  getUnique = async (id: string): Promise<Ticket | null> => {
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
