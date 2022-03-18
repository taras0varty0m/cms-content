import { IsDefined, IsEnum, MaxLength } from "class-validator";
import { IsAcceptableFileExtension } from "./IsAcceptableFileExtension";

export class GetUploadLinkDto {
  @IsDefined()
  @MaxLength(64)
  @IsAcceptableFileExtension()
  filename: string;
}
export class GetUploadLinkResponseDto {
  url: string;

  fileKey: string;
}
