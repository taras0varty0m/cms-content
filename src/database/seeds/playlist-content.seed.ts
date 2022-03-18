import { Factory, Seeder } from "typeorm-seeding";
import { User } from "src/users/entities/user.entity";
import { Content } from "src/contents/entities/content.entity";
import { Playlist } from "src/playlists/entities/playlist.entity";
import { PlaylistContent } from "src/playlist-content/entities/playlist-content.entity";
import { ContentGroup } from "src/content-group/entities/content-group.entity";

export default class PlaylistContentSeed implements Seeder {
  async run(factory: Factory): Promise<void> {
    const user = await factory(User)().create();

    const playlist = await factory(Playlist)()
      .map(async (playlist: Playlist) => {
        playlist.userId = user.id;
        return playlist;
      })
      .create();

    const group = await factory(ContentGroup)()
      .map(async (contentGroup: ContentGroup) => {
        contentGroup.userId = user.id;
        return contentGroup;
      })
      .create();

    const content = await factory(Content)()
      .map(async (content: Content) => {
        content.groupId = group.id;
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
