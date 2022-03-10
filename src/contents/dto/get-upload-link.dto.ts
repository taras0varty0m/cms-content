import { IsDefined, MaxLength } from "class-validator";

export class GetUploadLinkDto {
  @IsDefined()
  @MaxLength(64)
  filename: string;
}
export class GetUploadLinkResponseDto {
  url: string;

  fileKey: string;
}
