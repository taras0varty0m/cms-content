import { Repository } from "typeorm";
import { EntityRepository } from "typeorm/decorator/EntityRepository";
import { Content } from "./entities/content.entity";

@EntityRepository(Content)
export class ContentsRepository extends Repository<Content> {}
