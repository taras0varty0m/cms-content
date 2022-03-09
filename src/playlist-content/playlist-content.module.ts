import { Module } from "@nestjs/common";
import { PlaylistContentService } from "./playlist-content.service";
import { PlaylistContentController } from "./playlist-content.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlaylistContentRepository } from "./playlist-content.repository";

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistContentRepository])],
  controllers: [PlaylistContentController],
  providers: [PlaylistContentService],
})
export class PlaylistContentModule {}
