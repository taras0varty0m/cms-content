import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { Crud, CrudAuth, CrudController } from "@nestjsx/crud";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RequestUserDto } from "src/users/dto/request-user.dto";
import { AddHrefToResponseInterceptor } from "./add-href-to-response.interceptor";
import { ContentsService } from "./contents.service";
import { ContentDto } from "./dto/content.dto";
import { CreateContentDto } from "./dto/create-content.dto";
import {
  GetUploadLinkDto,
  GetUploadLinkResponseDto,
} from "./dto/get-upload-link.dto";
import { UpdateContentDto } from "./dto/update-content.dto";
import { EditContentsGuard } from "./edit-contents.guard";
import { Content } from "./entities/content.entity";
import { RemoveFileS3 } from "./remove-file-s3.interceptor";
import { S3Service } from "./s3.service";

@Crud({
  model: {
    type: Content,
  },

  serialize: {
    create: CreateContentDto,
    update: UpdateContentDto,
    replace: UpdateContentDto,
    get: ContentDto,
  },

  params: {
    id: {
      field: "id",
      type: "uuid",
      primary: true,
    },
  },

  routes: {
    only: [
      "createOneBase",
      "replaceOneBase",
      "updateOneBase",
      "deleteOneBase",
      "getManyBase",
      "getOneBase",
    ],
    getManyBase: {
      decorators: [UseInterceptors(AddHrefToResponseInterceptor)],
    },
    getOneBase: {
      decorators: [UseInterceptors(AddHrefToResponseInterceptor)],
    },
    createOneBase: {
      decorators: [UseInterceptors(AddHrefToResponseInterceptor)],
    },
    replaceOneBase: {
      decorators: [
        UseGuards(EditContentsGuard),
        UseInterceptors(AddHrefToResponseInterceptor),
      ],
    },
    updateOneBase: {
      decorators: [
        UseGuards(EditContentsGuard),
        UseInterceptors(AddHrefToResponseInterceptor),
      ],
    },
    deleteOneBase: {
      decorators: [UseGuards(EditContentsGuard), UseInterceptors(RemoveFileS3)],
    },
  },
})
@CrudAuth({
  property: "user",
  persist: (user: RequestUserDto) => ({
    userId: user.id,
  }),
})
@ApiTags("contents")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("contents")
export class ContentsController implements CrudController<Content> {
  constructor(public service: ContentsService, public s3: S3Service) {}

  @Post("/upload-s3-file-link")
  @ApiResponse({
    type: GetUploadLinkResponseDto,
    description: "Signed S3 link for file uploading",
    status: 201,
  })
  public async getUploadLink(
    @Body() body: GetUploadLinkDto
  ): Promise<GetUploadLinkResponseDto> {
    return this.s3.getSignedUploadUrl(body);
  }
}
