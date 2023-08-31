import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 8080;
export const NODE_ENV = process.env.NODE_ENV || 'development';

export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || '';
export const GEOIP_API_KEY = process.env.GEO_API_KEY || '';

export const MAILER_HOST = process.env.MAILER_HOST || '';
export const MAILER_SERVICE = process.env.MAILER_SERVICE || '';
export const MAILER_PORT = process.env.MAILER_PORT || '';
export const MAILER_USERNAME = process.env.MAILER_USERNAME || '';
export const MAILER_PASSWORD = process.env.MAILER_PASSWORD || '';
export const EMAIL_FROM = process.env.EMAIL_FROM || '';

export const DATABASE_URL_GLOBAL = process.env.DATABASE_URL_GLOBAL || '';
export const DATABASE_URL_LOCAL = process.env.DATABASE_URL_LOCAL || '';

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '';
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || '';
export const JWT_ACCESS_EXPIRATION_MINUTES =
  process.env.JWT_ACCESS_EXPIRATION_MINUTES || 30;
export const JWT_REFRESH_EXPIRATION_DAYS =
  process.env.JWT_REFRESH_EXPIRATION_DAYS || 30;
export const JWT_RESET_PASSWORD_EXPIRATION_MINUTES =
  process.env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES || 10;
export const JWT_VERIFY_EMAIL_EXPIRATION_MINUTES =
  process.env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES || 10;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
export const REDIRECT_URI = process.env.REDIRECT_URI || '';
export const DRIVE_REFRESH_TOKEN = process.env.DRIVE_REFRESH_TOKEN || '';
export const DRIVE_ACCESS_TOKEN = process.env.DRIVE_ACCESS_TOKEN || '';
