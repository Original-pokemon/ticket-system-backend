export const swaggerOptions = {
  swagger: {
    info: {
      title: "Ticket system",
      version: "0.1.0",
    },
    tags: [
      { name: "user", description: "User related end-points" },
      { name: "group", description: "Group related end-points" },
      {
        name: "task-performer",
        description: "Task performer related end-points",
      },
      {
        name: "manager",
        description: "Manager related end-points",
      },
      {
        name: "petrol-station",
        description: "Petrol station related end-points",
      },
      {
        name: "category",
        description: "Category station related end-points",
      },
      {
        name: "bush",
        description: "Bush station related end-points",
      },
      { name: "priority", description: "Priority related end-points" },
      { name: "tag-word", description: "Tag word related end-points" },
      { name: "attachment", description: "Attachment related end-points" },
      { name: "comment", description: "Comment related end-points" },
      { name: "status", description: "Status related end-points" },
      {
        name: "status-history",
        description: "Status history related end-points",
      },
      { name: "ticket", description: "Ticket related end-points" },
    ],
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
    host: "localhost:80",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
};
