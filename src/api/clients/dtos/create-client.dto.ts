import { IsNotEmpty, IsString } from "class-validator";
import {
  GenericResponseClass,
  GenericResponseDto,
} from "src/shared/classes/generic-classes";
import { ApiProperty } from "@nestjs/swagger";

export class CreateClientInputDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class CreateClientsOutputDataDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userName: string;
}

export class CreateClientResponseClass extends GenericResponseClass<CreateClientsOutputDataDto> {
  constructor(public data: CreateClientsOutputDataDto) {
    super(data);
  }
}

export class CreateClientResponsDto extends GenericResponseDto {
  @ApiProperty({ type: CreateClientsOutputDataDto })
  data: CreateClientsOutputDataDto;
}
