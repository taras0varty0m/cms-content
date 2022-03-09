import { ApiHideProperty } from "@nestjs/swagger";
import { Event } from "src/events/entities/event.entity";
import { Playlist } from "src/playlists/entities/playlist.entity";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Screen extends BaseEntity {
  @ApiHideProperty()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiHideProperty()
  @Column()
  eventId: string;

  @Column()
  playlistId: string;

  @ApiHideProperty()
  @ManyToOne(() => Event, (event) => event.screens, { onDelete: "CASCADE" })
  event?: Event;

  @ApiHideProperty()
  @OneToOne(() => Playlist, (playlist) => playlist.screen)
  playlist?: Playlist;
}
