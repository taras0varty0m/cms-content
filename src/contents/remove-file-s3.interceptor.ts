import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, of, tap } from "rxjs";
import { S3Service } from "./s3.service";
import { ContentsService } from "./contents.service";

@Injectable()
export class RemoveFileS3 implements NestInterceptor {
  constructor(private s3: S3Service, private content: ContentsService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Promise<Observable<any>> {
    if (context.getType() === "http") {
      const { id: contentId } = context.switchToHttp().getRequest().params;
      const { fileKey } = await this.content.findOne(contentId);

      try {
        return next
          .handle()
          .pipe(tap(async () => await this.s3.removeFile(fileKey)));
      } catch (e) {
        context.switchToHttp().getResponse().status(500);

        return of({
          error: {
            message: "Can not remove file from S3",
          },
        });
      }
    }

    throw new Error("Unimplemented");
  }
}
