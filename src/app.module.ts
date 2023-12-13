import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/chatster_db'),
    ClientsModule,
  ],
})
export class AppModule {}
