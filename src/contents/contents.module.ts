import { Module } from "@nestjs/common";
import { ContentsService } from "./contents.service";
import { ContentsRepository } from "./Contents.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContentsController } from "./contents.controller";
import { ConfigModule } from "@nestjs/config";
import { S3Service } from "./s3.service";
import { AddHrefToResponseInterceptor } from "./add-href-to-response.interceptor";
import { RemoveFileS3 } from "./remove-file-s3.interceptor";

@Module({
  imports: [TypeOrmModule.forFeature([ContentsRepository]), ConfigModule],
  controllers: [ContentsController],
  providers: [
    RemoveFileS3,
    S3Service,
    ContentsService,
    AddHrefToResponseInterceptor,
  ],
})
export class ContentsModule {}
