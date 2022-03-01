import { ApiHideProperty, PartialType } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { CreateContentDto } from "./create-content.dto";

export class ContentDto extends PartialType(CreateContentDto) {
  id: string;

  @Exclude()
  @ApiHideProperty()
  userId: string;
}
