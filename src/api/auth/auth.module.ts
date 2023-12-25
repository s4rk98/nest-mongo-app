import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { ClientsModule } from "src/api/clients/clients.module";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthGuard } from "./auth.guard";
import { APP_GUARD } from "@nestjs/core";

@Module({
  imports: [
    ClientsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        signOptions: { expiresIn: configService.get<string>("EXPIRES_IN") },
        secret: configService.get<string>("JWT_SECRET_KEY"),
      }),
    }),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AuthModule {}

// JwtModule.register({ global: true, secret: API_CONSTANTS.jwtSecret, signOptions: { expiresIn: '1m' } })
