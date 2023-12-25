import {
  Body,
  Controller,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ClientsService } from "./clients.service";
import { GenericExceptionFilter } from "src/filters/generic-filter/generic-filter.filter";
import { CreateClientInputDto, CreateClientResponsDto } from "./dtos";
import { AllowWithoutAuth } from "src/shared/consts/api-constants";
import { ApiTags, ApiResponse } from "@nestjs/swagger";

@Controller({ path: "clients" })
@ApiTags("Clients")
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Post()
  @AllowWithoutAuth()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @UseFilters(new GenericExceptionFilter())
  @ApiResponse({ type: CreateClientResponsDto })
  createClient(@Body() body: CreateClientInputDto) {
    return this.clientsService.createClient(body);
  }
}
