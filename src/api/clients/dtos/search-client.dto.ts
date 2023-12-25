import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import {
  GenericResponseClass,
  GenericResponseDto,
} from "src/shared/classes/generic-classes";

export class GetClientByWildCardSearchQueryInputDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userNameKeyword: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit: number = 10;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  offset: number = 0;
}

export class GetClientByWildCardSearchOutputClientDataDto {
  @ApiProperty()
  userName: string;

  @ApiProperty()
  createAt: string;

  @ApiProperty()
  id: string;
}
export class GetClientByWildCardSearchOutputDataDto {
  @ApiProperty({ type: [GetClientByWildCardSearchOutputClientDataDto] })
  clientList: GetClientByWildCardSearchOutputClientDataDto[];

  @ApiProperty()
  totalCount: number;
}

export class GetClientByWildCardSearchOutputClass extends GenericResponseClass<GetClientByWildCardSearchOutputDataDto> {
  constructor(data: GetClientByWildCardSearchOutputDataDto) {
    super(data);
  }
}

export class GetClientByWildCardSearchOutputDto extends GenericResponseDto {
  @ApiProperty({ type: GetClientByWildCardSearchOutputDataDto })
  data: GetClientByWildCardSearchOutputDataDto;
}
