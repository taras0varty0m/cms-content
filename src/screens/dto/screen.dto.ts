import { ApiHideProperty, PartialType } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { CreateScreenDto } from "./create-screen.dto";

export class ScreenDto extends PartialType(CreateScreenDto) {
  id: string;

  @Exclude()
  @ApiHideProperty()
  eventId: string;
}
