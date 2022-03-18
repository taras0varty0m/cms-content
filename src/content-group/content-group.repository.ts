import { Repository } from "typeorm";
import { EntityRepository } from "typeorm/decorator/EntityRepository";
import { ContentGroup } from "./entities/content-group.entity";

@EntityRepository(ContentGroup)
export class ContentGroupRepository extends Repository<ContentGroup> {}
