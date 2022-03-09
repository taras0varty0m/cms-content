import { Playlist } from "src/playlists/entities/playlist.entity";
import { define } from "typeorm-seeding";

define(Playlist, (faker) => {
  const playlist = new Playlist();
  playlist.title = faker.random.words(1);
  return playlist;
});
