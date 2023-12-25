import {
  Body,
  Controller,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { GenericExceptionFilter } from "src/filters/generic-filter/generic-filter.filter";
import { AuthClientsLoginDetailsDto } from "./dtos";
import { AllowWithoutAuth } from "src/shared/consts/api-constants";

@Controller({ path: "auth" })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("client-login")
  @AllowWithoutAuth()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @UseFilters(new GenericExceptionFilter())
  loginUser(@Body() loginDetails: AuthClientsLoginDetailsDto) {
    return this.authService.loginUser(loginDetails);
  }
}
