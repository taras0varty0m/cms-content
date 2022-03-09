import { Repository } from "typeorm";
import { EntityRepository } from "typeorm/decorator/EntityRepository";
import { Screen } from "./entities/screen.entity";

@EntityRepository(Screen)
export class ScreensRepository extends Repository<Screen> {}
