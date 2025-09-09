const querystringId = "querystring";

export const querystringSchema = {
  $id: querystringId,
  type: "object",
  properties: {
    id: {
      type: "array",
      items: { type: "string" },
    },
    _start: {
      type: "number",
    },
    _end: {
      type: "number",
    },
    _sort: {
      type: "string",
    },
    _order: {
      type: "string",
      enum: ["DESC", "ASC"],
    },
  },
};
