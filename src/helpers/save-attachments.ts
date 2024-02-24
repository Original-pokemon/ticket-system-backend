import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";
import fs from "node:fs/promises";
import path from "node:path";
import { staticFilePrefix, uploadsDirectory } from "#root/const.js";

const downloadAndSaveFile = async (
  attachment: string,
): Promise<{ id: string; path: string }> => {
  const id = uuidv4();
  const fileName = `${id}.jpg`;
  const localPath = path.join(uploadsDirectory, fileName);
  const staticPath = path.join(staticFilePrefix, fileName);

  try {
    const response = await fetch(attachment, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to download file. Status: ${response.status} ${response.statusText}`,
      );
    }
    const buffer = Buffer.from(await response.arrayBuffer());

    try {
      await fs.writeFile(localPath, buffer);
    } catch (error) {
      if (error instanceof Error) {
        throw new TypeError(`Failed to save file to disk. ${error.message}`);
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new TypeError(
        `Failed to fetch file from ${attachment}. ${error.message}`,
      );
    }
  }

  return {
    id,
    path: staticPath,
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
