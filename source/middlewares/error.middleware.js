/**
 * Handles the "Not Found" response for routes that are not matched.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const handleNotFound = (req, res) => {
  const errorMessage = `Not found - ${req.originalUrl}`;

  if (req.accepts('html') || req.accepts('json')) {
    return res.status(404).json({ message: errorMessage });
  }

  return res.status(404).json({ message: errorMessage });
};

/**
 * Handles errors by sending an appropriate error response.
 *
 * @param {Error} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const handleError = (err, req, res) => {
  const { statusCode } = res;
  res.status(statusCode).json({ message: err.message });
};

/**
 * Object containing route error handling functions.
 */
export default {
  handleNotFound,
  handleError,
};
