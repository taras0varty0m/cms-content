import { Injectable } from "@nestjs/common";
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ConfigService } from "@nestjs/config";
import { v4 as uuid } from "uuid";
import { GetUploadLinkDto } from "./dto/get-upload-link.dto";

@Injectable()
export class S3Service {
  constructor(private configService: ConfigService) {}

  private readonly client = new S3Client({
    endpoint: "https://storage.yandexcloud.net",
    region: this.configService.get<string>("S3_REGION"),

    credentials: {
      accessKeyId: this.configService.get<string>("S3_ACCESS_KEY"),
      secretAccessKey: this.configService.get<string>("S3_SECRET_KEY"),
    },
  });

  private bucket = this.configService.get<string>("S3_BUCKET");

  async getSignedUploadUrl({
    filename,
    extension,
  }: GetUploadLinkDto): Promise<{ url: string; fileKey: string }> {
    const fileKey = `${uuid()}-${filename}.${extension}`;

    const putFileCommand = new PutObjectCommand({
      Bucket: this.bucket,
      Key: fileKey,
      ACL: "bucket-owner-full-control",
    });

    const url = await getSignedUrl(this.client, putFileCommand);

    return { url, fileKey };
  }

  getFileHref(fileKey: string): string {
    return `https://storage.yandexcloud.net/${this.bucket}/${fileKey}`;
  }

  async removeFile(fileKey: string): Promise<void> {
    const removeFileCommand = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: fileKey,
    });

    await this.client.send(removeFileCommand);
  }
}
