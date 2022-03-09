import { Repository } from "typeorm";
import { EntityRepository } from "typeorm/decorator/EntityRepository";
import { Event } from "./entities/event.entity";

@EntityRepository(Event)
export class EventsRepository extends Repository<Event> {}
