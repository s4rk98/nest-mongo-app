import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import * as K from 'src/shared/consts';
import { Response } from 'express';
import * as CL from 'src/shared/classes';

@Catch()
export class GenericExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const resp = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : K.API_CONSTANTS.EXCEPTION_CODES.INTERNAL_ERROR.code;
    const message = exception?.response?.message || exception.message;
    const displayMessage = exception.message;
    const logData = {
      status,
      message,
      statusCode: exception?.response?.statusCode,
    };

    let jsonResp = null;
    if (status !== K.API_CONSTANTS.EXCEPTION_CODES.INTERNAL_ERROR.code) {
      jsonResp = new CL.GENERIC_CLASSES.GenericResponseClass<any>(
        [],
        exception?.response?.statusCode,
        false,
        displayMessage,
      );
    } else {
      jsonResp = new CL.GENERIC_CLASSES.GenericResponseClass<any>(
        [],
        K.API_CONSTANTS.EXCEPTION_CODES.INTERNAL_ERROR.statusCode,
        false,
        K.API_CONSTANTS.EXCEPTION_CODES.INTERNAL_ERROR.message,
      );
    }
    console.log(logData);
    resp.status(status).json(jsonResp);
  }
}
