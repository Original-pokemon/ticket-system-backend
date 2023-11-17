const Comment = {
  type: "object",
  properties: {
    id: { type: "string" },
    ticket_id: { type: "string" },
    user_id: { type: "string" },
    text: { type: "string" },
    created_at: { type: "string", format: "date-time" },
  },
  required: ["id", "ticket_id", "user_id", "text", "created_at"],
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
  body: {
    type: "object",
    required: ["id"],
    properties: Comment,
  },
  response: {
    200: Comment,
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
  deleteCommentSchema,
  getCommentSchema,
  getCommentsSchema,
  updateCommentSchema,
};
