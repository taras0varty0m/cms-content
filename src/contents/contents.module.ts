import { Module } from "@nestjs/common";
import { ContentsService } from "./contents.service";
import { ContentsRepository } from "./Contents.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContentsController } from "./contents.controller";

@Module({
  imports: [TypeOrmModule.forFeature([ContentsRepository])],
  controllers: [ContentsController],
  providers: [ContentsService],
})
export class ContentsModule {}
