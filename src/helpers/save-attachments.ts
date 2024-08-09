import fetch from "node-fetch";
import { basename } from "node:path";
import S3Service from "#root/services/s3/index.js";

const downloadAndSaveFile = async (
  attachment: string,
): Promise<{ id: string; path: string }> => {
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
      const location = await S3Service.uploadFile(buffer);

      return {
        id: basename(location),
        path: location,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new TypeError(`Failed to save file. ${error.message}`);
      }

      throw new Error("Failed to save file");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new TypeError(
        `Failed to fetch file from ${attachment}. ${error.message}`,
      );
    }
    throw new Error("Failed to download file");
  }
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
