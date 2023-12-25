import * as Joi from "joi";

export const configValidation = Joi.object({
    ENV: Joi.string().default('development'),
    HOST: Joi.string().default('localhost'),
    PORT: Joi.number().default(30000),
    DB_MONGO_CONNECTION_STRING: Joi.string().required(),
    JWT_SECRET_KEY: Joi.string().required(),
    BCRYPT_SALT: Joi.string().required(),
    EXPIRES_IN: Joi.string().required()
})