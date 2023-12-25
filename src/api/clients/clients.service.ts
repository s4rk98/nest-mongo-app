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
import { ConfigType } from "@nestjs/config";
import {
  GetClientByWildCardSearchOutputClass,
  GetClientByWildCardSearchOutputDataDto,
  GetClientByWildCardSearchQueryInputDto,
  GetClientOutputClass,
  GetClientParamDataDto,
  GetClientParamDto,
} from "./dtos";
import { SchemaTypes, Types, Document } from "mongoose";

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

  async getClient(params: GetClientParamDto) {
    const [userDetails] = await this.clientModal.aggregate([
      { $match: { _id: new Types.ObjectId(params.client_id) } },
      { $project: { _id: 0, id: "$_id", userName: 1, createAt: 1 } },
    ]);
    return new GetClientOutputClass(userDetails);
  }

  async getClientByWildCardSearch(
    query: GetClientByWildCardSearchQueryInputDto,
  ) {
    const regexp = new RegExp(`^${query.userNameKeyword.trim()}`, "gi");
    const [result] = await this.clientModal.aggregate([
      {
        $match: {
          userName: { $regex: regexp },
        },
      },
      { $sort: { userName: 1, createAt: 1 } },
      { $project: { _id: 0, id: "$_id", userName: 1, createAt: 1 } },
      {
        $facet: {
          clientList: [
            { $match: {} },
            { $skip: query.offset },
            { $limit: query.limit },
          ],
          totalCount: [{ $count: "count" }],
        },
      },
    ]);
    const clientList = result.clientList;
    const totalCount = result.totalCount[0]?.count || 0;
    const data: GetClientByWildCardSearchOutputDataDto = {
      clientList: clientList,
      totalCount,
    };
    return new GetClientByWildCardSearchOutputClass(data);
  }
}
