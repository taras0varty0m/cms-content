import { ApiHideProperty } from "@nestjs/swagger";
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
  @ApiHideProperty()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiHideProperty()
  @Column()
  href: string;

  @Column()
  fileKey: string;

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
  @OneToMany(() => PlaylistContent, (playlist) => playlist.content)
  playlists?: PlaylistContent[];
}
