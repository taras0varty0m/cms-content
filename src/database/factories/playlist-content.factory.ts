import { define } from "typeorm-seeding";
import { PlaylistContent } from "src/playlist-content/entities/playlist-content.entity";

define(PlaylistContent, (faker) => {
  const playlistContent = new PlaylistContent();
  playlistContent.priority = faker.random.number();
  playlistContent.duration = faker.random.number();
  return playlistContent;
});
