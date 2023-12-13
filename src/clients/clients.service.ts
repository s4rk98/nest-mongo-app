import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Client } from './schema/clients.schema';
import { Model } from 'mongoose';
import {
  CreateClientInputDto,
  CreateClientResponseClass,
  CreateClientsOutputDataDto,
} from './dtos/create-client.dto';
import * as bcrypt from 'bcrypt';
import { InjectConnection } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as K from 'src/shared/consts';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name) private clientModal: Model<Client>,
    @InjectConnection()
    private readonly mongooseConnection: mongoose.Connection,
  ) {}

  async createClient(body: CreateClientInputDto) {
    const { userName, password } = body;
    const passwordHash = await bcrypt.hash(
      password,
      K.API_CONSTANTS.CLIENTS_CONSTANTS.SALTORROUNDS,
    );
    const transSession = await this.mongooseConnection.startSession();
    let insertResponse = null;
    try {
      await transSession.withTransaction(async () => {
        const ClientDoc = await this.clientModal.find({ userName });
        if (ClientDoc.length) {
          throw new Error(K.API_CONSTANTS.CLIENTS_CONSTANTS.CLIENT_EXISTS);
        }
        const newClientDoc: Client = {
          userName: userName,
          createAt: new Date(),
          passwordHash: passwordHash,
        };
        const newClient = new this.clientModal(newClientDoc);
        insertResponse = await newClient.save({ session: transSession });
      });
    } catch (error) {
      if (error.message === K.API_CONSTANTS.CLIENTS_CONSTANTS.CLIENT_EXISTS)
        throw new ConflictException(
          K.API_CONSTANTS.API_ERROR_CODES.USER_ALREADY_EXISTS,
        );
      else throw error;
    }
    await transSession.endSession();
    const respData: CreateClientsOutputDataDto = {
      id: insertResponse._id,
      userName,
    };
    return new CreateClientResponseClass([respData]);
  }
}
