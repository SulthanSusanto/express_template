import generateFilter from '../utils/filter.js';
import getInt from '../utils/converter.js';

/**
 * Generate pagination parameters based on the provided page and limit values
 * @param {number} page - The page number.
 * @param {number} limit - The number of items per page.
 * @returns {Object} - An object containing the calculated pageDoc, limitDoc, and skipDoc values.
 */
const paginationDoc = (page, limit) => {
  const pageDoc = page <= 0 ? 1 : page;
  const limitDoc = limit <= 0 ? 10 : limit;
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
const paginationSubDoc = (array, perPage, pageNumber) =>
  array.slice((pageNumber - 1) * perPage, pageNumber * perPage);

/**
 * Retrieves paginated data from a database using provided parameters.
 *
 * @param {Object} dbAccess - The database access object.
 * @param {Function} mapping - A function to map data retrieved from the database.
 * @param {Object} query - The query parameters for filtering data.
 * @param {number} page - The requested page number (default: 1).
 * @param {number} limit - The number of items per page (default: 10).
 * @returns {Object} An object containing paginated data and metadata.
 */
const paginatingFromDB = async (dbAccess, mapping, query, page, limit) => {
  const filters = generateFilter(query);
  const totalItems = await dbAccess.total(filters);

  const { skipDoc, limitDoc, pageDoc } = paginationDoc(
    getInt(page),
    getInt(limit),
  );
  const totalPages = Math.ceil(totalItems / limit);

  const data = await dbAccess.findByFilter(filters, limitDoc, skipDoc);
  return {
    totalItems,
    totalPages,
    page: pageDoc,
    limit: limitDoc,
    data: data.map((value) => mapping(value)),
  };
};

/**
 * Retrieves a paginated subarray of items from a JavaScript array.
 *
 * @param {Array} array - The original array.
 * @param {number} page - The requested page number.
 * @param {number} limit - The number of items per page.
 * @returns {Array} A subarray of items for the specified page.
 */
const paginatingArray = (array, mapping, query, page, limit) => {
  const totalItems = array.length;
  const totalPages = Math.ceil(totalItems / limit);

  if (page > totalPages) {
    // If the requested page is beyond the available pages, return an empty array
    return [];
  }

  // Calculate the starting index and ending index for the current page
  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, totalItems);

  // Use Array.slice to extract the items for the current page
  const paginatedItems = array.slice(startIndex, endIndex);

  return {
    totalItems,
    totalPages,
    page,
    limit,
    data: paginatedItems.map((value) => mapping(value)),
  };
};

export default {
  paginationDoc,
  paginationSubDoc,
  paginatingFromDB,
  paginatingArray,
};
