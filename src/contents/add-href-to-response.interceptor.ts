import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { S3Service } from "./s3.service";
import { map, Observable } from "rxjs";
import { ContentDto } from "./dto/content.dto";

@Injectable()
export class AddHrefToResponseInterceptor implements NestInterceptor {
  constructor(private s3: S3Service) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    if (context.getType() === "http") {
      return next.handle().pipe(
        map((body: ContentDto | Array<ContentDto>) => {
          if (Array.isArray(body)) {
            body.forEach(
              (item) => (item.href = this.s3.getFileHref(item.fileKey))
            );
          } else {
            body.href = this.s3.getFileHref(body.fileKey);
          }
          return body;
        })
      );
    }

    throw new Error("Unimplemented");
  }
}
