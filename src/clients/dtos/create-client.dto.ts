import { IsNotEmpty, IsString } from 'class-validator';
import { GenericResponseClass } from 'src/shared/classes/generic-classes';

export class CreateClientInputDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class CreateClientsOutputDataDto {
  id: string;
  userName: string;
}

export class CreateClientResponseClass extends GenericResponseClass<CreateClientsOutputDataDto> {
  constructor(public data: CreateClientsOutputDataDto[]) {
    super(data);
  }
}
