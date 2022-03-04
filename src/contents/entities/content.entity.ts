import { PlaylistContent } from "src/playlist-content/entities/playlist-content.entity";
import { User } from "src/users/entities/user.entity";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Content extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  href: string;

  @ManyToOne(() => User, (user) => user.id, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  user: User;

  @Column()
  userId: string;

  @OneToMany(() => PlaylistContent, (playlist) => playlist.content)
  playlists?: PlaylistContent[];
}
