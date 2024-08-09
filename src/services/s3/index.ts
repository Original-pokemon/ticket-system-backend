import {
  S3Client,
  HeadBucketCommand,
  CreateBucketCommand,
  PutObjectCommand,
  ObjectCannedACL,
  DeleteObjectCommand,
  ListObjectsCommand,
  ListObjectsCommandOutput,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { logger } from "#root/logger.js";
import { config } from "#root/config.js";

class S3Service {
  private s3: S3Client;

  private endpoint: string = config.S3_ENDPOINT;

  private folderName: string = "ticket_system";

  private bucketName: string = config.S3_BUCKET_NAME;

  constructor() {
    this.s3 = new S3Client({
      region: "ru-1",
      forcePathStyle: true,
      endpoint: this.endpoint,
      credentials: {
        accessKeyId: config.S3_ACCESS_KEY,
        secretAccessKey: config.S3_SECRET_KEY,
      },
    });
  }

  async initializeBucket(): Promise<void> {
    const bucketParameters = {
      Bucket: this.bucketName,
    };
    try {
      const bucketExists = await this.s3.send(
        new HeadBucketCommand(bucketParameters),
      );
      if (bucketExists) {
        logger.info(`Bucket "${this.bucketName}" already exists.`);
      }
    } catch (error: any) {
      if (error.code === "NotFound" || error.code === "NoSuchBucket") {
        logger.info(
          `Bucket "${this.bucketName}" does not exist. Creating it now...`,
        );

        await this.s3.send(new CreateBucketCommand(bucketParameters));

        logger.info(`Bucket "${this.bucketName}" created successfully.`);
      } else {
        logger.info("Error checking or creating bucket:", error);
        throw new Error("Error initializing bucket");
      }
    }
  }

  /**
   *
   * @param filePath string link to file on telegram server
   * @returns
   */
  async uploadFile(buffer: Buffer): Promise<string> {
    const id = uuidv4();
    const key = `${this.folderName}/${id}.jpg`;

    const parameters = {
      Bucket: this.bucketName,
      Key: key,
      Body: buffer,
      ACL: ObjectCannedACL.public_read, // Настройте доступ по вашему усмотрению
    };

    try {
      await this.s3.send(new PutObjectCommand(parameters));
      const location = `${this.endpoint}${this.bucketName}/${key}`;
      return location;
    } catch (error) {
      logger.error("Error uploading file:", error);
      throw new Error("Error uploading file");
    }
  }

  async deleteFile(fileName: string): Promise<void> {
    const parameters = {
      Bucket: this.bucketName,
      Key: fileName,
    };

    try {
      await this.s3.send(new DeleteObjectCommand(parameters));
    } catch (error) {
      logger.error("Error deleting file:", error);
      throw new Error("Error deleting file");
    }
  }

  async listFiles(): Promise<ListObjectsCommandOutput> {
    const parameters = {
      Bucket: this.bucketName,
    };

    try {
      const data = await this.s3.send(new ListObjectsCommand(parameters));
      return data;
    } catch (error) {
      logger.error("Error listing files:", error);
      throw new Error("Error listing files");
    }
  }
}

export default new S3Service();
