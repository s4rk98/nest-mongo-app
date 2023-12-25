import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ClientsService } from "./clients.service";
import { GenericExceptionFilter } from "src/filters/generic-filter/generic-filter.filter";
import {
  CreateClientInputDto,
  CreateClientResponsDto,
  GetClientByWildCardSearchOutputDto,
  GetClientByWildCardSearchQueryInputDto,
  GetClientOutputDto,
  GetClientParamDto,
} from "./dtos";
import { AllowWithoutAuth } from "src/shared/consts/api-constants";
import { ApiTags, ApiResponse, ApiBody, ApiParam } from "@nestjs/swagger";

@Controller({ path: "clients" })
@ApiTags("Clients")
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Post()
  @AllowWithoutAuth()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @UseFilters(new GenericExceptionFilter())
  @ApiResponse({ type: CreateClientResponsDto })
  @ApiBody({ type: CreateClientInputDto })
  createClient(@Body() body: CreateClientInputDto) {
    return this.clientsService.createClient(body);
  }

  @Get("search")
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @UseFilters(new GenericExceptionFilter())
  @ApiResponse({ type: GetClientByWildCardSearchOutputDto })
  getClientByWildCardSearch(
    @Query() query: GetClientByWildCardSearchQueryInputDto,
  ) {
    return this.clientsService.getClientByWildCardSearch(query);
  }

  @Get("/:client_id")
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @UseFilters(new GenericExceptionFilter())
  @ApiResponse({ type: GetClientOutputDto })
  @ApiParam({ name: "client_id", type: String })
  getClient(@Param() params: GetClientParamDto) {
    return this.clientsService.getClient(params);
  }
}
