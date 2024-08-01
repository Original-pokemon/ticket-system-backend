export const UserGroup = {
  Admin: "admin",
  Supervisor: "supervisor",
  Unauthorized: "unauthorized",
  Blocked: "blocked",
  Manager: "manager",
  PetrolStation: "petrol-station",
  TaskPerformer: "task-performer",
} as const;

export const TicketStatus = {
  Created: "1",
  ReviewedManager: "2",
  ReviewedTaskPerformer: "3",
  SeenTaskPerformer: "4",
  Performed: "5",
  WaitingConfirmation: "6",
  Completed: "7",
} as const;

export const TicketPriority = {
  High: "1",
  Medium: "2",
  Low: "3",
};

export const TicketCategory = {
  Electrician: "1",
  Mechanic: "2",
  Plumber: "3",
  Builder: "4",
} as const;

export const Bush = {
  Istra: "1",
  Odintsovo: "2",
  Derzhinsky: "3",
  GPN_1: "4",
  GPN_2: "5",
  Opti: "6",
} as const;
