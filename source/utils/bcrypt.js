import bcrypt from 'bcrypt';
import CustomError from './CustomError.js';

/**
 * Generates a hash for a given password using bcrypt.
 *
 * @param {string} password - The password to be hashed.
 * @param {number} [hash=10] - The number of rounds for the bcrypt hashing.
 * @returns {Promise<string>} - A promise that resolves to the generated hash.
 */
const generatePasswordHash = (password, hash = 10) => {
  return bcrypt.hash(password, hash);
};
/**
 * Compares a given password with a hash and throws an error if they do not match.
 *
 * @param {string} password - The password to be compared.
 * @param {string} hashPassword - The hash to compare the password against.
 * @returns {Promise<boolean>} - A promise that resolves to true if the password matches the hash.
 * @throws {CustomError} - If the password and hash do not match.
 */
const comparePasswordToHash = async (password, hashPassword) => {
  // Compare the given password with the hash using bcrypt's compare function.
  const isMatch = await bcrypt.compare(password, hashPassword);

  // If the password and hash do not match, throw a UserError with a status code of 400.
  if (!isMatch) {
    throw new CustomError('Password does not match', 400);
  }

  return isMatch; // Return true if the password and hash match.
};

export default { generatePasswordHash, comparePasswordToHash };
