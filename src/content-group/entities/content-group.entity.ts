import { ApiHideProperty } from "@nestjs/swagger";
import { Content } from "src/contents/entities/content.entity";
import { User } from "src/users/entities/user.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  OneToMany,
} from "typeorm";

@Entity()
export class ContentGroup {
  @ApiHideProperty()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiHideProperty()
  @OneToMany(() => Content, (content) => content.group)
  contents?: Content[];

  @ApiHideProperty()
  @ManyToOne(() => User, (user) => user.id, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  user?: User;

  @ApiHideProperty()
  @Column()
  userId: string;

  @Column()
  type: string;
}
