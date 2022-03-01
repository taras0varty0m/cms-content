import { Content } from "src/contents/entities/content.entity";
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
  ManyToMany,
} from "typeorm";

@Entity()
export class Playlist extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false, length: 32 })
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

  @ManyToMany(() => Content, (content) => content.playlists, {
    eager: true,
  })
  contents: Content[];
}
