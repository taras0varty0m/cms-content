import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Content } from "./entities/Content.entity";
import { ContentsRepository } from "./Contents.repository";

@Injectable()
export class ContentsService extends TypeOrmCrudService<Content> {
  constructor(contentsRepository: ContentsRepository) {
    super(contentsRepository);
  }
}
