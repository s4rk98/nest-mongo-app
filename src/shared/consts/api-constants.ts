import { SetMetadata } from "@nestjs/common";

export const API_ERROR_CODES = {
  USER_ALREADY_EXISTS: {
    statusCode: 4090,
    message: "User already exists",
  },
  USER_DOES_NOT_EXIST: {
    statusCode: 4041,
    message: "User does not exists",
  },
  UNAUTHORIZED_CLIENT_LOGIN: {
    statusCode: 4010,
    message: "Unauthorized client login",
  },
  UNAUTHORIZED_ACCESS: {
    statusCode: 4011,
    message: "Unauthorized access",
  },
};

export const EXCEPTION_CODES = {
  INTERNAL_ERROR: {
    code: 500,
    name: "Internal Server Error",
    statusCode: 5000,
    message: "Something went wrong",
  },
  REQUEST_ERROR: {
    code: 400,
    name: "Request Error",
    statusCode: 4000,
    message: "Error or invalid data from request side",
  },
  FORBIDDEN_ERROR: {
    code: 403,
    name: "Forbidden Error",
    statusCode: 4030,
    message: "This operation is forbidden",
  },
};

export const CLIENTS_CONSTANTS = {
  CLIENT_EXISTS: "client_exists",
};

export const IS_PUBLIC_KEY = "isPublic";
export const AllowWithoutAuth = () => SetMetadata(IS_PUBLIC_KEY, true);

export const SWAGGER_API_ENDPOINT = "api-docs";