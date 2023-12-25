import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ClientsService } from "./clients.service";
import { GenericExceptionFilter } from "src/filters/generic-filter/generic-filter.filter";
import { CreateClientInputDto } from "./dtos";
import { AuthGuard } from "src/auth/auth.guard";
import { AllowWithoutAuth } from "src/shared/consts/api-constants";

@Controller({ path: "clients" })
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Post()
  @AllowWithoutAuth()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @UseFilters(new GenericExceptionFilter())
  createClient(@Body() body: CreateClientInputDto) {
    return this.clientsService.createClient(body);
  }

  @Get()
  sayHello() {
    return process.env;
  }
}
