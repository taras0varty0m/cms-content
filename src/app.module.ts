import * as Joi from "joi";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { EventsModule } from "./events/events.module";
import { ScreensModule } from "./screens/screens.module";
import { PlaylistsModule } from "./playlists/playlists.module";
import { ContentsModule } from "./contents/contents.module";
import { PlaylistContentModule } from "./playlist-content/playlist-content.module";
import { ContentGroupModule } from "./content-group/content-group.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        API_PORT: Joi.number().required(),
        CONNECTION: Joi.string().required(),
        USERNAME: Joi.string().required(),
        PASSWORD: Joi.string().required(),
        DATABASE: Joi.string().required(),
        PORT: Joi.number().required(),
        S3_REGION: Joi.string().required(),
        S3_ACCESS_KEY: Joi.string().required(),
        S3_SECRET_KEY: Joi.string().required(),
        S3_BUCKET: Joi.string().required(),
        AUTH0_ISSUER_URL: Joi.string().required(),
        AUTH0_AUDIENCE: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot(),
    AuthModule,
    UsersModule,
    EventsModule,
    ScreensModule,
    PlaylistsModule,
    ContentsModule,
    PlaylistContentModule,
    ContentGroupModule,
  ],
})
export class AppModule {}
