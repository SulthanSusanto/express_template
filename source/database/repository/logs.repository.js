import Category from '../models/category.model.js';
import CustomError from '../../utils/CustomError.js';

/**
 * Inserts data into the Category collection in the database.
 *
 * @param {Object} dataToInsert - The data to be inserted into the Category collection.
 * @returns {Promise<Object>} - A promise that resolves to the inserted data.
 */
const insertingDocData = async (dataToInsert) => {
  return await Category.create(dataToInsert); // Using the Category model to insert data.
};

/**
 * Finds Categorys in the Category collection based on filters, limit, and skip.
 *
 * @param {Object} filters - The filters to apply to the query (default: empty object).
 * @param {number} limit - The maximum number of results to return (optional).
 * @param {number} skip - The number of results to skip (optional).
 * @returns {Promise<Array>} - A promise that resolves to an array of Categorys matching the filters.
 */
const findByFilter = async (filters = {}, limit, skip) => {
  return await Category.find(filters)
    .limit(limit && limit)
    .skip(skip && skip);
};

/**
 * Retrieves all Categorys from the Category collection.
 *
 * @returns {Promise<Array>} - A promise that resolves to an array of all Categorys.
 */
const findAll = async () => {
  return await Category.find().lean();
};

/**
 * Retrieves a Category by its unique ID.
 *
 * @param {string} id - The unique ID of the Category to retrieve.
 * @returns {Promise<Object>} - A promise that resolves to the retrieved Category data.
 * @throws {CustomError} - If the Category is not found, throws an error with a status code of 400.
 */
const findById = async (id) => {
  const data = await Category.findOne({ _id: id });
  if (!data) {
    throw new CustomError('Category not found', 400);
  }

  return data;
};

/**
 * Retrieves the total count of Categorys based on provided filters.
 *
 * @param {Object} filters - The filters to apply when counting Categorys (default: empty object).
 * @returns {Promise<number>} - A promise that resolves to the total count of Categorys.
 */
const getTotal = async (filters = {}) => {
  return await Category.countDocuments(filters);
};

/**
 * Factory function for creating the Category database access layer.
 * @returns {Object} - The Category database access layer.
 */
export default function makeCategoryDb() {
  return Object.freeze({
    insertingDocData,
    findAll,
    findByFilter,
    findById,
    getTotal,
  });
}
