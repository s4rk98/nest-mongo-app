import {
  Body,
  Controller,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientInputDto } from './dtos/create-client.dto';
import { GenericExceptionFilter } from 'src/filters/generic-filter/generic-filter.filter';

@Controller({ path: 'clients' })
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @UseFilters(new GenericExceptionFilter())
  createClient(@Body() body: CreateClientInputDto) {
    return this.clientsService.createClient(body);
  }
}
