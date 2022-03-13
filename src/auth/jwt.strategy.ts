import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { passportJwtSecret } from "jwks-rsa";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${configService.get<string>(
          "AUTH0_ISSUER_URL"
        )}/.well-known/jwks.json`,
      }),
      audience: `${configService.get<string>("AUTH0_AUDIENCE")}`,
      issuer: `${configService.get<string>("AUTH0_ISSUER_URL")}/`,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      algorithms: ["RS256"],
    });
  }

  validate(payload: unknown) {
    return payload;
  }
}
