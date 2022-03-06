import { Factory, Seeder } from "typeorm-seeding";
import { User } from "src/users/entities/user.entity";
import { Event } from "src/events/entities/event.entity";
import { Screen } from "src/screens/entities/screen.entity";
import { Playlist } from "src/playlists/entities/playlist.entity";

export default class ScreenSeed implements Seeder {
  async run(factory: Factory): Promise<void> {
    const user = await factory(User)().create();

    const event = await factory(Event)()
      .map(async (event: Event) => {
        event.userId = user.id;
        return event;
      })
      .create();

    const playlist = await factory(Playlist)()
      .map(async (playlist: Playlist) => {
        playlist.userId = user.id;
        return playlist;
      })
      .create();

    await factory(Screen)()
      .map(async (screen: Screen) => {
        screen.eventId = event.id;
        screen.playlistId = playlist.id;
        return screen;
      })
      .create();
  }
}
