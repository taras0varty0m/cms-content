import { Factory, Seeder } from "typeorm-seeding";
import { User } from "src/users/entities/user.entity";
import { Playlist } from "src/playlists/entities/playlist.entity";

export default class PlaylistSeed implements Seeder {
  async run(factory: Factory): Promise<void> {
    const user = await factory(User)().create();

    await factory(Playlist)()
      .map(async (playlist: Playlist) => {
        playlist.userId = user.id;
        return playlist;
      })
      .create();
  }
}
