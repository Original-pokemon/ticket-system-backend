import path from "node:path";
import { fileURLToPath } from "node:url";

export const uploadsDirectory = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "uploads",
);
export const staticFilePrefix = "/public/";
