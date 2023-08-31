import { matchPassword } from '../utils/bcrypt.js';
import { ServerError } from '../utils/ApiError.js';
import tokenService from './token.service.js';
import {
  RESET_PASSWORD,
  REFRESH,
  VERIFY_EMAIL,
} from '../config/token.config.js';

import makeTokenDb from '../database/repository/token.repository.js';
import makeUserDb from '../database/repository/user.repository.js';

const userAccess = makeUserDb();
const tokenAccess = makeTokenDb();

/**
 * Login user with username and password
 * @param {string} username - The username.
 * @param {string} password - The password.
 * @returns {Promise<User>} - A promise that resolves with the logged-in user.
 */
const loginUserWithUsernameAndPassword = async ({
  dbAccess,
  username,
  password,
}) => {
  const userFound = await dbAccess.findByUsername(username);

  if (!userFound.isActive) {
    throw new ServerError('employee has been blocked', 400);
  }

  await matchPassword(password, userFound.password);

  userFound.password = undefined;

  return userFound;
};

/**
 * Logout a user by removing the refresh token from the database
 * @param {string} refreshToken - The refresh token to be removed.
 * @returns {Promise<void>} - A promise that resolves when the refresh token is removed.
 */
const logout = async (refreshToken) => {
  await tokenAccess.removeByRefreshtoken(refreshToken);
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, password) => {
  const resetPasswordTokenDoc = await tokenService.verifyToken(
    resetPasswordToken,
    RESET_PASSWORD,
  );

  const user = await userAccess.findById(resetPasswordTokenDoc.user);

  await userAccess.update(user._id, { password });
  await tokenAccess.removeManyByUserIdAndType({
    user: user._id,
    type: RESET_PASSWORD,
  });
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  const refreshTokenDoc = await tokenService.verifyToken(refreshToken, REFRESH);

  const user = await userAccess.findById(refreshTokenDoc.user);

  await refreshTokenDoc.remove();
  return tokenService.generateAuthTokens(user);
};

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
const verifyEmail = async (verifyEmailToken) => {
  const verifyEmailTokenDoc = await tokenService.verifyToken(
    verifyEmailToken,
    VERIFY_EMAIL,
  );
  const user = await userAccess.findById(verifyEmailTokenDoc.user);

  await tokenAccess.removeManyByUserIdAndType({
    user: user.id,
    type: VERIFY_EMAIL,
  });
  await userAccess.update(user._id, { isEmailVerified: true });
};

export default {
  loginUserWithUsernameAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
};
