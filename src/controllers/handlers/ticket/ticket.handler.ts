import TicketRepository from "#root/repositories/ticket/ticket.repository.js";
import { Ticket } from "@prisma/client";
import {
  createResourceHandler,
  deleteResourceHandler,
  getResourceHandler,
  updateResourceHandler,
  getResourcesHandler,
} from "../common-resource-handler.js";

const ticketResource = {
  getAll: TicketRepository.getAll,
  getUnique: TicketRepository.getUnique,
  create: TicketRepository.create,
  update: TicketRepository.update,
  delete: TicketRepository.delete,
  name: "ticket",
};

export const getTicketsHandler = getResourcesHandler(ticketResource);
export const getTicketHandler = getResourceHandler(ticketResource);
export const createTicketHandler =
  createResourceHandler<Ticket>(ticketResource);
export const updateTicketHandler =
  updateResourceHandler<Ticket>(ticketResource);
export const deleteTicketHandler = deleteResourceHandler(ticketResource);
