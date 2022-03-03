import { Playlist } from "src/playlists/entities/playlist.entity";
import { User } from "src/users/entities/user.entity";
import { define, factory } from "typeorm-seeding";

define(Playlist, (faker) => {
  const playlist = new Playlist();
  playlist.user = factory(User)() as any;
  playlist.title = faker.random.words(1);
  return playlist;
});
