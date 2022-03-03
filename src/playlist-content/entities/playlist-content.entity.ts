import { Content } from "src/contents/entities/content.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Playlist } from "../../playlists/entities/playlist.entity";

@Entity()
export class PlaylistContent {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Playlist, (playlist) => playlist.contents, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  playlist: Playlist;

  @Column()
  playlistId: string;

  @ManyToOne(() => Content, (content) => content.id, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  content: Content;

  @Column()
  contentId: string;

  @Column()
  duration: number;

  @Column()
  priority: number;
}
