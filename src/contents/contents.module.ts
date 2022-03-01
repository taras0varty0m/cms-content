import { Module } from "@nestjs/common";
import { ContentsService } from "./contents.service";
import { ContentsController } from "./contents.controller";
import { ContentsRepository } from "./Contents.repository";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([ContentsRepository])],
  controllers: [ContentsController],
  providers: [ContentsService],
})
export class ContentsModule {}
