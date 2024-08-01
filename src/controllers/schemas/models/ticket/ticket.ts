import { Ticket } from "@prisma/client";

type TicketKeys = keyof Ticket;

const ticketProperties: { [key in TicketKeys]: object } = {
  id: { type: "string" },
  title: { type: "string" },
  description: { type: "string" },
  status_id: { type: "string" },
  petrol_station_id: { type: "string" },
  ticket_category: { type: ["string", "null"] },
  deadline: { type: ["string", "null"] },
  ticket_priority: { type: ["string", "null"] },
  created_at: { type: "string", format: "date-time" },
};

const TicketSchema = {
  $id: "ticket",
  type: "object",
  properties: ticketProperties,
};

const TicketInfoSchema = {
  $id: "ticketInfo",
  type: "object",
  properties: {
    ...ticketProperties,
    attachments: {
      type: "array",
      items: { type: "string" },
    },
    comments: {
      type: "array",
      items: { type: "string" },
    },
    status_history: {
      type: "array",
      items: { $ref: "statusHistory" },
    },
  },
};

export { TicketSchema, TicketInfoSchema };
