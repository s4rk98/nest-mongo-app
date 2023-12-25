import { ApiProperty } from "@nestjs/swagger";

export class GenericResponseClass<T> {
  constructor(
    public data: T = null,
    public statusCode: number = 200,
    public success: boolean = true,
    public message: string = "",
  ) {}
}

export class GenericResponseDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;
}
