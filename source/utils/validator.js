import isEmail from 'validator/lib/isEmail.js';
import mongoose from 'mongoose';

/**
 * Validates if a given value matches the expected data type.
 * @param {*} value - The value to be validated.
 * @param {string} expectedType - The expected data type (e.g., 'string', 'number', 'object', etc.).
 * @returns {boolean} - Returns true if the value matches the expected data type, false otherwise.
 */
const validateType = (value, expectedType) => {
  return (
    typeof value === expectedType &&
    (expectedType !== 'object' || value !== null)
  );
};

/**
 * Validates a value against a regular expression pattern.
 *
 * @param {string} value - The value to be validated.
 * @param {RegExp} pattern - The regular expression pattern to test against.
 * @returns {boolean} - True if the value matches the pattern, false otherwise.
 */
const validateAgainstPattern = (value, pattern) => {
  // Use the test method of the pattern to check if the value matches.
  return Boolean(pattern?.test(value));
};

/**
 * Validates if a given value is an array.
 * @param {*} value - The value to be validated.
 * @returns {boolean} - Returns true if the value is an array, false otherwise.
 */
const validateArray = (value) => {
  return Array.isArray(value);
};

/**
 * Validates if a given value is a valid email address.
 * @param {string} value - The email address to be validated.
 * @returns {boolean} - Returns true if the value is a valid email address, false otherwise.
 */
const validateEmail = (value) => {
  return isEmail(value);
};

/**
 * Validates if a given value is a valid MongoDB object ID.
 * @param {string} value - The value to be validated as a MongoDB object ID.
 * @returns {boolean} - Returns true if the value is a valid MongoDB object ID, false otherwise.
 */
const validateMongodbId = (value) => {
  return mongoose.isValidObjectId(value);
};

export default {
  validateType,
  validateAgainstPattern,
  validateEmail,
  validateArray,
  validateMongodbId,
};
