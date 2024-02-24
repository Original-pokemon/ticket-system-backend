import { createRouteSchema } from "../common-schemas.js";

const tags = ["ticket"];
const ticketSchema = { $ref: "ticket" };
const TicketInfoSchema = { $ref: "ticketInfo" };

const getTicketsSchema = createRouteSchema({
  tags,
  querystring: { $ref: "querystring" },
  response: {
    200: {
      type: "array",
      items: ticketSchema,
    },
  },
});

const getTicketSchema = createRouteSchema({
  tags,
  params: {
    id: { type: "string" },
  },
  response: {
    200: TicketInfoSchema,
    404: { $ref: "notFoundSchema" },
  },
});

const createTicketSchema = createRouteSchema({
  tags,
  body: TicketInfoSchema,
  response: {
    200: {
      type: "string",
    },
  },
});

const updateTicketSchema = createRouteSchema({
  tags,
  params: {
    id: { type: "string" },
  },
  body: TicketInfoSchema,
  response: {
    200: ticketSchema,
  },
});

const deleteTicketSchema = createRouteSchema({
  tags,
  params: {
    id: { type: "string" },
  },
  response: {
    200: { type: "string" },
  },
});

export {
  createTicketSchema,
  deleteTicketSchema,
  getTicketsSchema,
  getTicketSchema,
  updateTicketSchema,
};
