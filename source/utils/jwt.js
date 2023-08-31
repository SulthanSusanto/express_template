import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../config/env.config.js';

/**
 * Decodes and verifies a JWT token using the provided secret.
 *
 * @param {Object} options - An object containing token and secret for verification.
 * @param {string} options.token - The JWT token to be decoded and verified.
 * @param {string} options.secret - The secret key used to verify the token's signature.
 * @returns {Object} - The decoded payload of the JWT token.
 * @throws {Error} - If the token verification fails or an error occurs during decoding.
 */
const decodedToken = ({ token, secret }) => {
  return jwt.verify(token, secret);
};

/**
 * Generates a JWT token with the specified payload, type, secret, and expiration time.
 *
 * @param {Object} options - An object containing token generation options.
 * @param {Object} options.payload - The payload to be included in the JWT token.
 * @param {string} options.type - The type of the token (e.g., 'access', 'refresh').
 * @param {string} [options.secret=ACCESS_TOKEN_SECRET] - The secret key used to sign the token.
 * @param {string} [options.expiresIn='10d'] - The expiration time for the token.
 * @returns {string} - The generated JWT token.
 */
const generateToken = ({
  payload,
  type,
  secret = ACCESS_TOKEN_SECRET,
  expiresIn = '10d',
}) => {
  payload.type = type;
  return jwt.sign(payload, secret, { expiresIn });
};

export default { decodedToken, generateToken };
