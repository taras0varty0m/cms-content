import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import * as bcrypt from "bcryptjs";
import { Exclude } from "class-transformer";
import { Event } from "src/events/entities/event.entity";
import { Content } from "src/contents/entities/content.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Event, (event) => event.user, {
    cascade: true,
  })
  events?: Event[];

  @OneToMany(() => Content, (content) => content.user)
  contents?: Content[];
}
