export const APIRoute = {
  Groups: {
    All: "/groups",
    Info: `/group/:id`,
    Create: "/group/create",
    Update: `/group/update/:id`,
    Delete: `/group/delete/:id`,
  },
  Users: {
    All: "/users",
    Info: `/user/:id`,
    Create: "/user/create",
    Update: `/user/update/:id`,
    Delete: `/user/delete/:id`,
  },
  TaskPerformers: {
    All: "/task-performers",
    Info: `/task-performer/:id`,
    Create: "/task-performer/create",
    Update: `/task-performer/update/:id`,
    Delete: `/task-performer/delete/:id`,
  },
  Manager: {
    All: "/managers",
    Info: `/manager/:id`,
    Create: "/manager/create",
    Update: `/manager/update/:id`,
    Delete: `/manager/delete/:id`,
  },
  PetrolStation: {
    All: "/petrol-stations",
    Info: `/petrol-station/:id`,
    Create: "/petrol-station/create",
    Update: `/petrol-station/update/:id`,
    Delete: `/petrol-station/delete/:id`,
  },
} as const;
