import getInt from './converter.js';

/**
 * Generate pagination parameters based on the provided page and limit values
 * @param {number} page - The page number.
 * @param {number} limit - The number of items per page.
 * @returns {Object} - An object containing the calculated pageDoc, limitDoc, and skipDoc values.
 */
const generatePaginationParameters = (page, limit) => {
  const pageDoc = getInt(page || 1) <= 0 ? 1 : getInt(page || 1);
  const limitDoc = getInt(limit || 10) <= 0 ? 10 : getInt(limit || 10);
  const skipDoc = (page - 1) * limit;

  return { pageDoc, limitDoc, skipDoc };
};

/**
 * Retrieves a subarray of items for a specific page in pagination.
 *
 * @param {Array} array - The original array.
 * @param {number} perPage - The number of items per page.
 * @param {number} pageNumber - The page number.
 * @returns {Array} The subarray of items for the specified page.
 *
 * @example
 * const originalArray = [1, 2, 3, 4, 5];
 * const subArray = paginationSubDoc(originalArray, 2, 2); // Returns [3, 4]
 */
const paginateArray = (array, perPage, pageNumber) =>
  array.slice((pageNumber - 1) * perPage, pageNumber * perPage);

export default { generatePaginationParameters, paginateArray };
