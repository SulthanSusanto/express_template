/**
 * Custom error class for creating structured custom error instances with additional properties.
 * Extends the built-in Error class.
 *
 * @class CustomError
 * @extends Error
 */
class CustomError extends Error {
  /**
   * Creates a new CustomError instance.
   *
   * @constructor
   * @param {string} message - The error message.
   * @param {number} statusCode - The HTTP status code associated with the error (default: 400).
   * @param {string} recommendation - A recommendation or additional information related to the error (optional).
   */
  constructor(message, statusCode = 400, recommendation = '') {
    super(message);
    this.name = 'CustomError';
    this.statusCode = statusCode;
    this.recommendation = recommendation;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export default CustomError;
