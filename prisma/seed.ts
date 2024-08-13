import logger from "#root/logger.js";
import { PrismaClient } from "@prisma/client";
import {
  Bush,
  TicketCategory,
  TicketPriority,
  TicketStatus,
  UserGroup,
} from "./const.js";

const prisma = new PrismaClient();

const upsertGroups = async () => {
  const GroupDescription = {
    [UserGroup.Admin]: "Администратор",
    [UserGroup.Supervisor]: "Супервизор",
    [UserGroup.Blocked]: "Заблокирован",
    [UserGroup.Manager]: "Менеджер",
    [UserGroup.PetrolStation]: "Заправочная станция",
    [UserGroup.TaskPerformer]: "Исполнитель задач",
    [UserGroup.Unauthorized]: "Неавторизован",
  } as const;

  const groupIds = Object.values(UserGroup);

  const promises = groupIds.map(async (id) => {
    const group = await prisma.group.upsert({
      where: {
        id,
      },
      update: {},
      create: {
        id,
        description: GroupDescription[id],
      },
    });

    return group;
  });

  const groups = await Promise.all(promises);

  return groups;
};

const upsertStatusList = async () => {
  const TicketStatusDescription = {
    [TicketStatus.Created]: "Создана",
    [TicketStatus.ReviewedManager]: "На рассмотрении у менеджера",
    [TicketStatus.ReviewedTaskPerformer]: "На рассмотрении у исполнителя задач",
    [TicketStatus.SeenTaskPerformer]: "Просмотренно исполнителем",
    [TicketStatus.Performed]: "Взята на исполнение",
    [TicketStatus.WaitingConfirmation]: "Ожидает подтверждения",
    [TicketStatus.Completed]: "Исполнена",
  } as const;

  const ticketStatusIdList = Object.values(TicketStatus);

  const promises = ticketStatusIdList.map(async (id) => {
    const status = await prisma.status.upsert({
      where: {
        id,
      },
      update: {},
      create: {
        id,
        description: TicketStatusDescription[id],
      },
    });

    return status;
  });

  const statusList = await Promise.all(promises);

  return statusList;
};

const upsertPriorityList = async () => {
  const TicketStatusDescription = {
    [TicketPriority.Medium]:
      "Может подождать (не блокирует, но ухудшает работу)",
    [TicketPriority.High]: "Критично (блокирует работу АЗС)",
    [TicketPriority.Low]: "Когда-нибудь (Только косметические  изменения )",
  };

  const ticketPriorityIdList = Object.values(TicketPriority);

  const promises = ticketPriorityIdList.map(async (id) => {
    const priority = await prisma.priority.upsert({
      where: {
        id,
      },
      update: {},
      create: {
        id,
        description: TicketStatusDescription[id],
      },
    });

    return priority;
  });

  const priorityList = await Promise.all(promises);

  return priorityList;
};

const upsertCategoryList = async () => {
  const TicketCategoryDescription = {
    [TicketCategory.Electrician]: "Электрики",
    [TicketCategory.Mechanic]: "Механики",
    [TicketCategory.Plumber]: "Сантехники",
    [TicketCategory.Builder]: "Строители",
  } as const;

  const ticketCategoryIdList = Object.values(TicketCategory);

  const promises = ticketCategoryIdList.map(async (id) => {
    const priority = await prisma.category.upsert({
      where: {
        id,
      },
      update: {},
      create: {
        id,
        description: TicketCategoryDescription[id],
      },
    });

    return priority;
  });

  const categoryList = await Promise.all(promises);

  return categoryList;
};

const upsertBushList = async () => {
  const BushDescription = {
    [Bush.Derzhinsky]: "Держинский",
    [Bush.Istra]: "Истра",
    [Bush.Odintsovo]: "Одинцово",
    [Bush.GPN_2]: "ГПН_2",
    [Bush.GPN_1]: "ГПН_1",
    [Bush.Opti]: "Опти",
  } as const;

  const ticketBushIdList = Object.values(Bush);

  const promises = ticketBushIdList.map(async (id) => {
    const bush = await prisma.bush.upsert({
      where: {
        id,
      },
      update: {},
      create: {
        id,
        description: BushDescription[id],
      },
    });

    return bush;
  });

  const bushList = await Promise.all(promises);

  return bushList;
};

const main = async () => {
  const groupList = await upsertGroups();
  logger.info(groupList, "created group list: ");

  const categoryList = await upsertCategoryList();
  logger.info(categoryList, "created category list: ");

  const statusList = await upsertStatusList();
  logger.info(statusList, "created status list: ");

  const priorityList = await upsertPriorityList();
  logger.info(priorityList, "created priority list: ");

  const bushList = await upsertBushList();
  logger.info(bushList, "created bush list: ");
};

try {
  await main();
  await prisma.$disconnect();
} catch (error) {
  await prisma.$disconnect();
  logger.error(error);
  await prisma.$disconnect();
  throw new Error("A mistake in the base of the seed ");
}
