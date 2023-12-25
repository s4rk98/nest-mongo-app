import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { configuration } from "src/config/configuration";
import * as K from "src/shared/consts";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(configuration.KEY) private config: ConfigType<typeof configuration>,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      K.API_CONSTANTS.IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );
    //  if public skip the tocken validation
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException(
        K.API_CONSTANTS.API_ERROR_CODES.UNAUTHORIZED_ACCESS,
      );
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.config.secrets.jwtSecret,
      });
      request["clientDetails"] = payload;
    } catch (error) {
      throw new UnauthorizedException(
        K.API_CONSTANTS.API_ERROR_CODES.UNAUTHORIZED_ACCESS,
      );
    }
    return true;
  }

  private extractTokenFromHeader(request: any) {
    const [type, token] = request.headers?.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
