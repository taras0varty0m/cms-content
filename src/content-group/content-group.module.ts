import { Module } from "@nestjs/common";
import { ContentGroupService } from "./content-group.service";
import { ContentGroupController } from "./content-group.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContentGroupRepository } from "./content-group.repository";

@Module({
  imports: [TypeOrmModule.forFeature([ContentGroupRepository])],
  controllers: [ContentGroupController],
  providers: [ContentGroupService],
})
export class ContentGroupModule {}
