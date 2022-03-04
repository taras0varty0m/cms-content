import { Screen } from "src/screens/entities/screen.entity";
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
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @OneToMany(() => Screen, (screen) => screen.event, {
    cascade: true,
  })
  screens?: Screen[];

  @ManyToOne(() => User, (user) => user.events, { onDelete: "CASCADE" })
  user: User;

  @Column()
  userId: string;
}
