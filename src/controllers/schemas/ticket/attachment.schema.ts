const Attachment = {
  type: "object",
  properties: {
    id: { type: "string" },
    comment_id: { type: "string" },
    path: { type: "string" },
  },
  required: ["id", "comment_id", "path"],
  additionalProperties: false,
};

const getAttachmentsSchema = {
  tags: ["attachment"],
  response: {
    200: {
      type: "array",
      items: Attachment,
    },
  },
};
const getSelectAttachmentsSchema = {
  tags: ["attachment"],
  querystring: {
    ids: {
      type: "array",
    },
  },
  response: {
    200: {
      type: "array",
      items: Attachment,
    },
  },
};

const getAttachmentSchema = {
  tags: ["attachment"],
  params: {
    id: { type: "string" },
  },
  response: {
    200: Attachment,
  },
};

const createAttachmentSchema = {
  tags: ["attachment"],
  body: Attachment,
  response: {
    200: {
      type: "string",
    },
  },
};

const updateAttachmentSchema = {
  tags: ["attachment"],
  params: {
    id: { type: "string" },
  },
  body: Attachment,
  response: {
    200: Attachment,
  },
};

const deleteAttachmentSchema = {
  tags: ["attachment"],
  params: {
    id: { type: "string" },
  },
  response: {
    200: Attachment,
  },
};

export {
  createAttachmentSchema,
  getSelectAttachmentsSchema,
  deleteAttachmentSchema,
  getAttachmentSchema,
  getAttachmentsSchema,
  updateAttachmentSchema,
};
