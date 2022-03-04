import { Factory, Seeder } from "typeorm-seeding";
import { User } from "src/users/entities/user.entity";
import { Event } from "src/events/entities/event.entity";
import { Content } from "src/contents/entities/content.entity";
import { Playlist } from "src/playlists/entities/playlist.entity";
import { PlaylistContent } from "src/playlist-content/entities/playlist-content.entity";
import { Screen } from "src/screens/entities/screen.entity";

export default class UserSeed implements Seeder {
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
        return screen;
      })
      .create();

    const content = await factory(Content)()
      .map(async (content: Content) => {
        content.userId = user.id;
        return content;
      })
      .create();

    await factory(PlaylistContent)()
      .map(async (playlistContent: PlaylistContent) => {
        playlistContent.playlist = playlist;
        playlistContent.content = content;
        return playlistContent;
      })
      .create();
  }
}
