import { PartialType } from "@nestjs/swagger";
import { CreateContentDto } from "./create-content.dto";

export class ContentDto extends PartialType(CreateContentDto) {
  id: string;
}
