import { Module } from "@nestjs/common";
import { ScreensService } from "./screens.service";
import { ScreensController } from "./screens.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ScreensRepository } from "./screens.repository";

@Module({
  imports: [TypeOrmModule.forFeature([ScreensRepository])],
  controllers: [ScreensController],
  providers: [ScreensService],
})
export class ScreensModule {}
