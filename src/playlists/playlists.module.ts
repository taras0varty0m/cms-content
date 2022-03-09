import { Module } from "@nestjs/common";
import { PlaylistsService } from "./playlists.service";
import { PlaylistsController } from "./playlists.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlaylistsRepository } from "./playlists.repository";

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistsRepository])],
  controllers: [PlaylistsController],
  providers: [PlaylistsService],
})
export class PlaylistsModule {}
