import { IsNotEmpty, IsString } from "class-validator";
import {
  GenericResponseClass,
  GenericResponseDto,
} from "src/shared/classes/generic-classes";
import { ApiProperty } from "@nestjs/swagger";

export class AuthClientsLoginDetailsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UserDetailsPayLoadDto {
  userId: string;
  username: string;
}
export class AuthTokenDto {
  @ApiProperty()
  token: string;
}

export class AuthClientsLoginResponseClass extends GenericResponseClass<AuthTokenDto> {
  constructor(data: AuthTokenDto) {
    super(data);
  }
}

export class AuthClientsLoginResponseDto extends GenericResponseDto {
  @ApiProperty({ type: AuthTokenDto })
  data: AuthTokenDto;
}
