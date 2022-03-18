import { PartialType } from "@nestjs/swagger";
import { CreateContentGroupDto } from "./create-content-group.dto";

export class ContentGroupDto extends PartialType(CreateContentGroupDto) {
  id: string;
}
