import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";
import { config } from "#root/config.js";
import fs from "node:fs/promises";

const downloadAndSaveFile = async (
  attachment: string,
): Promise<{ id: string; path: string }> => {
  const id = uuidv4();
  const response = await fetch(attachment);
  const buffer = Buffer.from(await response.arrayBuffer());
  const localPath = `${config.PATH_TO_SAVE_FILE}\\${id}.jpg`;
  await fs.writeFile(localPath, buffer);

  return {
    id,
    path: localPath,
  };
};

export const saveAttachments = async (
  attachments: string[],
): Promise<{ id: string; path: string }[]> => {
  const promises = attachments.map(async (attachment) => {
    const saveAttachment = await downloadAndSaveFile(attachment);
    return saveAttachment;
  });

  const result = await Promise.all(promises);
  return result;
};
