import { registerAs } from "@nestjs/config"

export const configuration = registerAs("config", () => ({
  env: process.env.ENV,
  host: process.env.HOST,
  port: process.env.PORT,
  db: {
    mongodb_connection_string: process.env.DB_MONGO_CONNECTION_STRING,
  },
  secrets: {
    jwtSecret: process.env.JWT_SECRET_KEY,
    bcryptSalt: process.env.BCRYPT_SALT,
    expiresIn: process.env.EXPIRES_IN,
  },
})); 