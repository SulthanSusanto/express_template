import authService from '../services/auth.service.js';
import emailService from '../services/email.service.js';
import tokenService from '../services/token.service.js';

// import makeUserDb from '../database/repository/user.repository.js';
// import userMapping from '../mapping/user.mapping.js';
import authValidator from '../validator/auth.validator.js';

import { successResponse } from '../utils/response.js';
// import endpointService from '../services/endpoint.service.js';

const validator = authValidator;
// const dbAccess = makeUserDb();
// const mapping = userMapping;

/**
 * Authenticates the user with the provided username and password,
 * generates an authentication token, and returns it in the response.
 *
 * @param {Object} req - The HTTP request object.
 * @returns {Promise<Object>} The response object containing the authentication token.
 */
const login = async (req) => {
  const { body } = req;

  const validatedDocData = await validator.loginValidator(body);

  const user = validatedDocData.getUser();

  const tokens = await tokenService.generateAuthTokens(user);

  return successResponse({ ...tokens });
};

/**
 * Logs out the user by invalidating the provided refresh token.
 *
 * @param {Object} req - The HTTP request object.
 * @returns {Promise<void>} A successful response if the logout is successful.
 */
const logout = async (req) => {
  const { body } = req;
  const refreshToken = validator.tokenValidator(body).getToken();

  await authService.logout(refreshToken);
  return successResponse();
};

const refreshTokens = async (req) => {
  const { body } = req;

  const refreshToken = validator.tokenValidator(body).getToken();

  const tokens = await authService.refreshAuth(refreshToken);
  return successResponse({ ...tokens });
};

/**
 * Sends a reset password email to the user's provided email address.
 *
 * @param {Object} req - The HTTP request object.
 * @returns {Promise<Object>} An empty response object.
 */
const forgotPassword = async (req) => {
  const { body } = req;

  const validatedData = validator.forgetPasswordValidator(body);

  const resetPasswordToken = await tokenService.generateResetPasswordToken(
    validatedData.getEmail(),
  );

  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);

  return successResponse({});
};

/**
 * Resets the user's password using the provided reset password token,
 * new password, and confirm password.
 *
 * @param {Object} req - The HTTP request object.
 * @returns {Promise<void>} A successful response if the password reset is successful.
 */
const resetPassword = async (req) => {
  const { query, body } = req;

  const token = validator.tokenValidator(query).getToken();

  const password = await validator
    .checkIsPasswordMatchValidator(body)
    .getPassword();

  await authService.resetPassword(token, password);
  return successResponse({});
};

/**
 * Sends a verification email to the user using the provided email address.
 *
 * @param {Object} req - The HTTP request object.
 * @returns {Promise<void>} A successful response if the email sending is successful.
 */
const sendVerificationEmail = async (req) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(
    req.user,
  );
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  return successResponse({});
};

/**
 * Verifies the user's email using the provided verification token.
 *
 * @param {Object} req - The HTTP request object.
 * @returns {Promise<void>} A successful response if the email verification is successful.
 */
const verifyEmail = async (req) => {
  const {
    query: { token },
  } = req;

  const validatedToken = validator.tokenValidator({ token }).getToken();

  await authService.verifyEmail(validatedToken);
  return successResponse();
};

export default {
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};
