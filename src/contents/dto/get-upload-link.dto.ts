import { IsDefined, IsEnum, MaxLength } from "class-validator";
import { Extensions } from "./extensions.enum";

export class GetUploadLinkDto {
  @IsDefined()
  @MaxLength(64)
  filename: string;

  @IsDefined()
  @MaxLength(64)
  @IsEnum(Extensions)
  extension: Extensions;
}
export class GetUploadLinkResponseDto {
  url: string;

  fileKey: string;
}
