import { Event } from "src/events/entities/event.entity";
import { Playlist } from "src/playlists/entities/playlist.entity";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Screen extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  eventId: string;

  @ManyToOne(() => Event, (event) => event.screens, { onDelete: "CASCADE" })
  event: Event;

  @ManyToOne(() => Playlist, (playlist) => playlist.screens, {
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  })
  playlist: Playlist;

  @Column()
  playlistId: string;
}
