import "dotenv/config";

import z from "zod";

const configSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  LOG_LEVEL: z
    .enum(["trace", "debug", "info", "warn", "error", "fatal", "silent"])
    .default("info"),
  HOST: z.string().default("0.0.0.0"),
  PORT: z.coerce.number().positive().default(80),
  COOKIE_SECRET: z.string(),
  JWT_SECRET: z.string(),
  EXTERNAL_SERVICE_LOGIN: z.string(),
  EXTERNAL_SERVICE_PASSWORD: z.string(),
});

const parseConfig = (environment: NodeJS.ProcessEnv) => {
  const config = configSchema.parse(environment);

  return {
    ...config,
    isDev: process.env.NODE_ENV === "development",
    isProd: process.env.NODE_ENV === "production",
  };
};

export type Config = ReturnType<typeof parseConfig>;

export const config = parseConfig(process.env);
