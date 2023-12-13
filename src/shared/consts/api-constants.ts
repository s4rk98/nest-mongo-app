export const API_ERROR_CODES = {
  USER_ALREADY_EXISTS: {
    statusCode: 4090,
    message: 'User already exists',
  },
};
export const EXCEPTION_CODES = {
  INTERNAL_ERROR: {
    code: 500,
    name: 'Internal Server Error',
    statusCode: 5000,
    message: 'Something went wrong',
  },
  REQUEST_ERROR: {
    code: 400,
    name: 'Request Error',
    statusCode: 4000,
    message: 'Error or invalid data from request side',
  },
  FORBIDDEN_ERROR: {
    code: 403,
    name: 'Forbidden Error',
    statusCode: 4030,
    message: 'This operation is forbidden',
  },
};

export const CLIENTS_CONSTANTS = {
  CLIENT_EXISTS: 'client_exists',
  SALTORROUNDS: 10,
};
