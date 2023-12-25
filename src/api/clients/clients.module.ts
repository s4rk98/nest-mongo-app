import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './schema/clients.schema';
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    ConfigModule,
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [MongooseModule, ClientsService], // enables other modules to import Client's Model
})
export class ClientsModule {}
