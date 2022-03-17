import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { passportJwtSecret } from "jwks-rsa";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "./auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService
  ) {
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
  async validate(payload: unknown) {
    const email: string =
      payload[this.configService.get<string>("EMAIL_TO_ACCESS_TOKEN_LINK")];
    if (!email) throw new UnauthorizedException("Cannot validate token");
    return this.authService.validateByEmailOrCreateUser(email);
  }
}
