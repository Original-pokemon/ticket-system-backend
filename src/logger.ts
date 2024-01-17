import { fileURLToPath } from "node:url";

import { config } from "#root/config.js";
import { pino } from "pino";

const developmentTargets = [
  {
    target: "pino-pretty",
    level: config.LOG_LEVEL,
    options: {
      ignore: "pid,hostname",
      colorize: true,
      translateTime: true,
    },
  },
];
const productionTargets = [
  {
    target: "pino/file",
    level: config.LOG_LEVEL,
    options: {
      destination: fileURLToPath(new URL("app.log", import.meta.url)),
    },
  },
  {
    target: "pino-pretty",
    level: config.LOG_LEVEL,
    options: {
      ignore: "pid,hostname",
      colorize: true,
      translateTime: true,
    },
  },
];

export const logger = pino({
  level: config.LOG_LEVEL,
  transport: {
    targets: [...(config.isDev ? developmentTargets : productionTargets)],
  },
});

export type Logger = typeof logger;
