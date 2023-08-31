import moment from 'moment';
import jwt from '../utils/jwt.js';

import {
  ACCESS_TOKEN_SECRET,
  JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
  JWT_ACCESS_EXPIRATION_MINUTES,
  JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  JWT_REFRESH_EXPIRATION_DAYS,
  REFRESH_TOKEN_SECRET,
  RESET_TOKEN_SECRET,
  VERIFY_EMAIL_TOKEN_SECRET,
} from '../config/env.config.js';
import {
  RESET_PASSWORD,
  VERIFY_EMAIL,
  ACCESS,
  REFRESH,
} from '../config/token.config.js';

import makeTokenDb from '../database/repository/token.repository.js';
import makeUserDb from '../database/repository/user.repository.js';

const tokenAccess = makeTokenDb();
const userAccess = makeUserDb();

/**
 * Generate a token using the provided user ID, expiration time, type, and secret
 * @param {string} userId - The user ID associated with the token.
 * @param {Moment} expires - The expiration time of the token.
 * @param {string} type - The type of the token.
 * @param {string} secret - The secret used to sign the token. Defaults to ACCESS_TOKEN_SECRET.
 * @returns {string} - The generated token.
 */

const generateToken = (userId, expires, type, secret) => {
  const payload = {
    sub: userId,
    exp: expires.unix(),
  };
  return jwt.generateToken({ payload, type, secret });
};

/**
 * Save a token to the database with the provided token, user ID, expiration time, type, and blacklisted status
 * @param {string} token - The token to be saved.
 * @param {string} userId - The user ID associated with the token.
 * @param {Moment} expires - The expiration time of the token.
 * @param {string} type - The type of the token.
 * @param {boolean} blacklisted - The status indicating if the token is blacklisted. Defaults to false.
 * @returns {Promise<void>} - A promise that resolves when the token is saved.
 */

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token, type) => {
  const payload = await jwt.decodedToken({
    token,
    secret: RESET_TOKEN_SECRET,
  });

  const tokenDoc = await tokenAccess.findOneByOptional({
    token,
    type,
    user: payload.sub,
    blacklisted: false,
  });

  return tokenDoc;
};

/**
 * Generate access and refresh tokens for the provided user
 * @param {User} user - The user object.
 * @returns {Promise<Object>} - A promise that resolves with the generated access and refresh tokens.
 */

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(
    JWT_ACCESS_EXPIRATION_MINUTES,
    'minutes',
  );

  const accessToken = generateToken(
    user._id,
    accessTokenExpires,
    ACCESS,
    ACCESS_TOKEN_SECRET,
  );

  const refreshTokenExpires = moment().add(JWT_REFRESH_EXPIRATION_DAYS, 'days');

  const refreshToken = generateToken(
    user.id,
    refreshTokenExpires,
    REFRESH,
    REFRESH_TOKEN_SECRET,
  );

  await tokenAccess.insert({
    token: refreshToken,
    user: user._id,
    expires: refreshTokenExpires,
    type: REFRESH,
  });

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

/**
 * Generate reset password token
 * @param {string} email
 * @returns {Promise<string>}
 */
const generateResetPasswordToken = async (email) => {
  const user = await userAccess.findByEmail(email);

  const expires = moment().add(
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    'minutes',
  );

  const resetPasswordToken = generateToken(
    user._id,
    expires,
    RESET_PASSWORD,
    RESET_TOKEN_SECRET,
  );

  await tokenAccess.insert({
    token: resetPasswordToken,
    user: user._id,
    expires,
    type: RESET_PASSWORD,
  });

  return resetPasswordToken;
};

/**
 * Generate verify email token
 * @param {User} user
 * @returns {Promise<string>}
 */
const generateVerifyEmailToken = async (user) => {
  const expires = moment().add(JWT_VERIFY_EMAIL_EXPIRATION_MINUTES, 'minutes');
  const verifyEmailToken = generateToken(
    user._id,
    expires,
    VERIFY_EMAIL,
    VERIFY_EMAIL_TOKEN_SECRET,
  );

  await tokenAccess.insert({
    token: verifyEmailToken,
    user: user._id,
    expires,
    type: VERIFY_EMAIL,
  });

  return verifyEmailToken;
};

export default {
  generateToken,
  generateAuthTokens,
  generateResetPasswordToken,
  generateVerifyEmailToken,
  verifyToken,
};
