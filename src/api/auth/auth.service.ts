import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import {
  AuthClientsLoginDetailsDto,
  AuthClientsLoginResponseClass,
  AuthTokenDto,
  UserDetailsPayLoadDto,
} from "./dtos";
import { ClientsService } from "src/api/clients/clients.service";
import * as K from "src/shared/consts";
import { JwtService } from "@nestjs/jwt";
import { ConfigType } from "@nestjs/config";
import { configuration } from "src/config/configuration";

@Injectable()
export class AuthService {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly jwtService: JwtService,
    @Inject(configuration.KEY) private config: ConfigType<typeof configuration>,
  ) {}
  async loginUser(loginDetails: AuthClientsLoginDetailsDto) {
    const userId = await this.clientsService.validateClientLogin(
      loginDetails.userName,
      loginDetails.password,
    );
    if (!userId) {
      throw new UnauthorizedException(
        K.API_CONSTANTS.API_ERROR_CODES.UNAUTHORIZED_CLIENT_LOGIN,
      );
    }
    const payload: UserDetailsPayLoadDto = {
      userId: userId.toString(),
      username: loginDetails.userName,
    };
    const authTokenDto: AuthTokenDto = {
      token: await this.jwtService.signAsync(payload),
    };
    return new AuthClientsLoginResponseClass(authTokenDto);
  }
}
