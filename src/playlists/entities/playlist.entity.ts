import { ApiHideProperty } from "@nestjs/swagger";
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
  @ApiHideProperty()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @ApiHideProperty()
  @ManyToOne(() => User, (user) => user.id, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  user?: User;

  @ApiHideProperty()
  @Column()
  userId: string;

  @ApiHideProperty()
  @OneToOne(() => Screen, (screen) => screen.playlist)
  @JoinTable()
  screen?: Screen;

  @ApiHideProperty()
  @OneToMany(
    () => PlaylistContent,
    (playlistContent) => playlistContent.playlist
  )
  contents?: PlaylistContent[];
}
