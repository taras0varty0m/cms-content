import { PlaylistContent } from "src/playlist-content/entities/playlist-content.entity";
import { Screen } from "src/screens/entities/screen.entity";
import { User } from "src/users/entities/user.entity";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToOne,
  Column,
  ManyToOne,
  JoinTable,
  OneToMany,
} from "typeorm";

@Entity()
export class Playlist extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.id, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  user: User;

  @Column()
  userId: string;

  @OneToOne(() => Screen, (screen) => screen.playlist)
  @JoinTable()
  screen?: Screen;

  @OneToMany(
    () => PlaylistContent,
    (playlistContent) => playlistContent.playlist
  )
  contents?: PlaylistContent[];
}
