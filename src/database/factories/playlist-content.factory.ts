import { define, factory } from "typeorm-seeding";
import { Content } from "src/contents/entities/content.entity";
import { Playlist } from "src/playlists/entities/playlist.entity";
import { PlaylistContent } from "src/playlist-content/entities/playlist-content.entity";

define(PlaylistContent, (faker) => {
  const playlistContent = new PlaylistContent();
  playlistContent.content = factory(Content)() as any;
  playlistContent.playlist = factory(Playlist)() as any;
  playlistContent.priority = faker.random.number();
  playlistContent.duration = faker.random.number();
  return playlistContent;
});
