import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { ContentGroup } from "./entities/content-group.entity";
import { ContentGroupRepository } from "./content-group.repository";

@Injectable()
export class ContentGroupService extends TypeOrmCrudService<ContentGroup> {
  constructor(contentGroupRepository: ContentGroupRepository) {
    super(contentGroupRepository);
  }
}
