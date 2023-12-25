import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Client } from "./schema/clients.schema";
import { Model } from "mongoose";
import {
  CreateClientInputDto,
  CreateClientResponseClass,
  CreateClientsOutputDataDto,
} from "./dtos/create-client.dto";
import * as bcrypt from "bcrypt";
import { InjectConnection } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import * as K from "src/shared/consts";
import { configuration } from "src/config/configuration";
import { ConfigService, ConfigType } from "@nestjs/config";

@Injectable()
export class ClientsService {
  private logger;
  constructor(
    @InjectModel(Client.name) private clientModal: Model<Client>,
    @InjectConnection()
    private readonly mongooseConnection: mongoose.Connection,
    @Inject(configuration.KEY) private config: ConfigType<typeof configuration>,
  ) {
    this.logger = new Logger(ClientsService.name);
  }

  async createClient(body: CreateClientInputDto) {
    const { userName, password } = body;
    const transSession = await this.mongooseConnection.startSession();
    let insertResponse = null;
    try {
      await transSession.withTransaction(async () => {
        const ClientDoc = await this.clientModal.find({ userName });
        if (ClientDoc.length) {
          throw new Error(K.API_CONSTANTS.CLIENTS_CONSTANTS.CLIENT_EXISTS);
        }
        const bcryptSalt = Number(this.config.secrets.bcryptSalt);
        const passwordHash = await bcrypt.hash(password, bcryptSalt);
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
    return new CreateClientResponseClass(respData);
  }

  async validateClientLogin(userName: string, password: string) {
    const user = await this.clientModal.findOne(
      { userName },
      { _id: "1", passwordHash: "1" },
    );
    if (!user) {
      throw new NotFoundException(
        K.API_CONSTANTS.API_ERROR_CODES.USER_DOES_NOT_EXIST,
      );
    }
    if (await bcrypt.compare(password, user.passwordHash)) {
      return user._id;
    }
    return null;
  }
}
