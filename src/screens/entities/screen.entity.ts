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
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  eventId: string;

  @ManyToOne(() => Event, (event) => event.screens, { onDelete: "CASCADE" })
  event?: Event;

  @OneToOne(() => Playlist, (playlist) => playlist.screen)
  playlist?: Playlist;
}
