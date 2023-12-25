import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ClientsModule } from "./api/clients/clients.module";
import { AuthModule } from "./api/auth/auth.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { configuration } from "./config/configuration";
import { configValidation } from "./config/validation";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("DB_MONGO_CONNECTION_STRING"),
      }),
    }),
    ClientsModule,
    AuthModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      validationSchema: configValidation,
    }),
  ],
})
export class AppModule {}
