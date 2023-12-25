import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import {
  GenericResponseClass,
  GenericResponseDto,
} from "src/shared/classes/generic-classes";

export class GetClientParamDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  client_id: string;
}

export class GetClientParamDataDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  createAt: string;
}

export class GetClientOutputClass extends GenericResponseClass<any> {
  constructor(data: any) {
    super(data);
  }
}

export class GetClientOutputDto extends GenericResponseDto {
  @ApiProperty({ type: GetClientParamDataDto })
  data: GetClientParamDataDto;
}
