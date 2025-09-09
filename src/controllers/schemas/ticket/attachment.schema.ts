import { createRouteSchema } from "../common-schemas.js";

const tags = ["attachment"];
const attachmentSchema = { $ref: "attachment" };

const getAttachmentsSchema = createRouteSchema({
  tags,
  querystring: { $ref: "querystring" },
  response: {
    200: {
      type: "array",
      items: attachmentSchema,
    },
  },
});

const getAttachmentSchema = createRouteSchema({
  tags,
  params: {
    id: { type: "string" },
  },
  response: {
    200: attachmentSchema,
    404: { $ref: "notFoundSchema" },
  },
});

const createAttachmentSchema = createRouteSchema({
  tags,
  body: attachmentSchema,
  response: {
    200: {
      type: "string",
    },
  },
});

const updateAttachmentSchema = createRouteSchema({
  tags,
  params: {
    id: { type: "string" },
  },
  body: attachmentSchema,
  response: {
    200: attachmentSchema,
  },
});

const deleteAttachmentSchema = createRouteSchema({
  tags,
  params: {
    id: { type: "string" },
  },
  response: {
    200: { type: "string" },
  },
});

export {
  createAttachmentSchema,
  deleteAttachmentSchema,
  getAttachmentSchema,
  getAttachmentsSchema,
  updateAttachmentSchema,
};
