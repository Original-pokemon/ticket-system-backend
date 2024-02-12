export const Comment = {
  type: "object",
  properties: {
    id: { type: "string" },
    ticket_id: { type: "string" },
    user_id: { type: "string" },
    text: { type: "string" },
    attachments: {
      type: "array",
      items: { type: "string" },
    },
    created_at: { type: "string", format: "date-time" },
  },
  additionalProperties: false,
};

const getCommentsSchema = {
  tags: ["comment"],
  response: {
    200: {
      type: "array",
      items: Comment,
    },
  },
};

const getSelectCommentsSchema = {
  tags: ["comment"],
  querystring: {
    ids: {
      type: "array",
    },
  },
  response: {
    200: {
      type: "array",
      items: Comment,
    },
  },
};

const getCommentSchema = {
  tags: ["comment"],
  params: {
    id: { type: "string" },
  },
  response: {
    200: Comment,
  },
};

const createCommentSchema = {
  tags: ["comment"],
  body: Comment,
  response: {
    200: {
      type: "string",
    },
  },
};

const updateCommentSchema = {
  tags: ["comment"],
  params: {
    id: { type: "string" },
  },
  body: Comment,
  response: {
    200: Comment,
  },
};

const deleteCommentSchema = {
  tags: ["comment"],
  params: {
    id: { type: "string" },
  },
  response: {
    200: Comment,
  },
};

export {
  createCommentSchema,
  getSelectCommentsSchema,
  deleteCommentSchema,
  getCommentSchema,
  getCommentsSchema,
  updateCommentSchema,
};
