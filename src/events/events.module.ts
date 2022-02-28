import { Module } from "@nestjs/common";
import { EventsService } from "./events.service";
import { EventsController } from "./events.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventsRepository } from "./events.repository";

@Module({
  imports: [TypeOrmModule.forFeature([EventsRepository])],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
