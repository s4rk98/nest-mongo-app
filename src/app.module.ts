import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb_cont_1:27017,mongodb_cont_2:27017,mongodb_cont_3:27017/?replicaSet=my_mongodb_replset'),
    ClientsModule,
  ],
})
export class AppModule {}
