import { ApiHideProperty, PartialType } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { CreateEventDto } from "./create-event.dto";

export class EventDto extends PartialType(CreateEventDto) {
  id: string;

  title: string;

  @Exclude()
  @ApiHideProperty()
  userId: string;
}
