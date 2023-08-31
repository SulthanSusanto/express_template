/**
 * Default headers for JSON responses.
 * @type {Object}
 */
const defaultHeaders = { 'Content-Type': 'application/json' };

/**
 * Constructs a standardized response object.
 *
 * @param {*} data - The data to include in the response.
 * @param {string} [message='success'] - A message describing the response status.
 * @param {number} [statusCode=200] - The HTTP status code of the response.
 * @returns {Object} - The response object containing headers, status code, and response body.
 */
const createResponse = (data, message = 'success', statusCode = 200) => {
  const responseObject = {
    headers: defaultHeaders,
    statusCode,
    body: { message, data },
  };

  return responseObject;
};

export default createResponse;
