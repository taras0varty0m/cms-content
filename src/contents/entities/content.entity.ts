import { Playlist } from "src/playlists/entities/playlist.entity";
import { User } from "src/users/entities/user.entity";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Content extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  extension: string;

  @Column({ nullable: true })
  duration: number;

  @ManyToOne(() => User, (user) => user.id, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  user?: User;

  @Column()
  userId: string;

  @ManyToMany(() => Playlist, (playlist) => playlist.contents)
  @JoinTable()
  playlists: Playlist[];
}
