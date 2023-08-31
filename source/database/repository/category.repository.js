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
 * Inserts data into a subdocument array within a document.
 * Validates if the data being inserted has a unique path in the subdocument array.
 * Throws a CustomError if the path is not unique.
 *
 * @param {string} docId - The ID of the document to which the subdocument array belongs.
 * @param {string} field - The field name of the subdocument array.
 * @param {Object} dataToInsert - The data to be inserted into the subdocument array.
 * @throws {CustomError} If the inserted data's path is not unique within the subdocument array.
 * @returns {Object} The updated document containing the inserted data.
 */
const insertingSubDocData = async (docId, subDocField, dataToInsert) => {
  const data = await findById(docId);

  // Check for duplicated path in the subdocument array
  const duplicatedPath = data[subDocField].find(
    (value) => value.path === dataToInsert.path,
  );

  if (duplicatedPath) {
    throw new CustomError('Path must be unique', 400);
  }

  // Insert the data and save the document
  data[subDocField].push(dataToInsert);
  await data.save();

  return data;
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
 * Updates a Category by its unique ID with the provided update data.
 *
 * @param {string} updatedDocId - The unique ID of the Category to update.
 * @param {Object} updatedData - The data to update the Category with.
 * @param {string} updatedBy - The identifier of the user who is updating the document.
 * @returns {Promise<Object>} - A promise that resolves to the updated Category data.
 * @throws {CustomError} - If the Category is not found, throws an error with a status code of 400.
 */
const updatingDocData = async (updatedDocId, updatedData, updatedBy) => {
  const data = await Category.findById(updatedDocId);

  data.updatedBy.push(updatedBy);
  Object.assign(data, updatedData);

  await data.save();
  return data;
};

/**
 * Updates a subdocument within a document's subdocument array.
 * Validates if the updated subdocument's path is unique within the array.
 * Throws a CustomError if the path is not unique or if the subdocument is not found.
 *
 * @param {string} docId - The ID of the parent document.
 * @param {string} subDocId - The ID of the subdocument to be updated.
 * @param {string} subDocField - The field name of the subdocument array.
 * @param {Object} updatedSubDocData - The updated data for the subdocument.
 * @param {string} updatedBy - The identifier of the user who is updating the document.
 * @throws {CustomError} If the updated subdocument's path is not unique within the array or if the subdocument is not found.
 * @returns {Object} The updated parent document containing the modified subdocument.
 */
const updatingSubDocData = async (
  docId,
  subDocId,
  subDocField,
  updatedSubDocData,
  updatedBy,
) => {
  let parentDocument = await findById(docId);

  // Check for duplicated path in the subdocument array
  const duplicatedPath = parentDocument[subDocField].find(
    (subDoc) =>
      subDoc.path === updatedSubDocData.path && subDoc.id !== subDocId,
  );

  if (duplicatedPath) {
    throw new CustomError('Path must be unique', 400);
  }

  // Find and update the subdocument
  const foundSubDoc = parentDocument[subDocField].find((subDoc) => {
    if (subDoc.id === subDocId) {
      subDoc.updatedBy.push(updatedBy);
      Object.assign(subDoc, updatedSubDocData);
      return subDoc;
    }
  });

  if (!foundSubDoc) {
    throw new CustomError('Subdocument not found', 400);
  }

  // Save the updated parent document
  await parentDocument.save();

  return parentDocument;
};

/**
 * Toggles the 'isActive' status of a Category by its unique ID.
 *
 * @param {string} updatedDocId - The unique ID of the Category to update.
 * @param {string} updatedBy - The identifier of the user who is updating the document.
 * @throws {CustomError} - If the Category is not found, throws an error with a status code of 400.
 */
const togglingIsActiveDocData = async (updatedDocId, updatedBy) => {
  const data = await findById(updatedDocId);

  data.isActive = !data.isActive;
  data.updatedBy.push(updatedBy);
  await data.save();
};

/**
 * Toggles the 'isActive' state of a subdocument within a document's subdocument array.
 * Throws a CustomError if the subdocument is not found.
 *
 * @param {string} docId - The ID of the parent document.
 * @param {string} subDocId - The ID of the subdocument to be updated.
 * @param {string} subDocField - The field name of the subdocument array.
 * @param {string} updatedBy - The identifier of the user who is updating the document.
 * @throws {CustomError} If the subdocument is not found.
 * @returns {Object} The updated parent document containing the modified subdocument.
 */
const togglingIsActiveSubdocData = async (
  docId,
  subDocId,
  subDocField,
  updatedBy,
) => {
  let parentDocument = await findById(docId);

  // Find and update the 'isActive' state of the subdocument
  const foundSubDoc = parentDocument[subDocField].find((subDoc) => {
    if (subDoc.id === subDocId) {
      subDoc.updatedBy.push(updatedBy);
      subDoc.isActive = !subDoc.isActive;
      return subDoc;
    }
  });

  if (!foundSubDoc) {
    throw new CustomError('Subdocument not found', 400);
  }

  // Save the updated parent document
  await parentDocument.save();

  return parentDocument;
};

/**
 * Soft deletes a Category by setting the 'deletedAt' field to the current date.
 *
 * @param {string} removedId - The unique ID of the Category to be soft deleted.
 * @param {string} deletedBy - The identifier of the user who is deleting the document.
 * @throws {CustomError} - If the Category is not found, throws an error with a status code of 400.
 */
const softDeletingDocData = async (removedId, deletedBy) => {
  const data = await findById(removedId);

  data.isDeleted = true;
  data.deletedBy = deletedBy;
  await data.save();
};

/**
 * Performs a soft delete on a subdocument within a document's subdocument array.
 * Sets the 'deletedAt' timestamp of the subdocument and saves the parent document.
 * Throws a CustomError if the subdocument is not found.
 *
 * @param {string} docId - The ID of the parent document.
 * @param {string} subDocId - The ID of the subdocument to be soft deleted.
 * @param {string} subDocField - The field name of the subdocument array.
 * @param {string} deletedBy - The identifier of the user who is deleting the document.
 * @throws {CustomError} If the subdocument is not found.
 * @returns {Object} The updated parent document containing the soft-deleted subdocument.
 */
const softDeletingSubdocData = async (
  docId,
  subDocId,
  subDocField,
  deletedBy,
) => {
  let parentDocument = await findById(docId);

  // Find and perform soft delete on the subdocument
  const foundSubDoc = docId[subDocField].find((subDoc) => {
    if (subDoc.id === subDocId) {
      subDoc.isDeleted = true;
      subDoc.deletedBy = deletedBy;
      return subDoc;
    }
  });

  if (!foundSubDoc) {
    throw new CustomError('Subdocument not found', 400);
  }

  // Save the updated parent document
  await parentDocument.save();

  return parentDocument;
};

/**
 * Factory function for creating the Category database access layer.
 * @returns {Object} - The Category database access layer.
 */
export default function makeCategoryDb() {
  return Object.freeze({
    insertingDocData,
    insertingSubDocData,
    findAll,
    findByFilter,
    findById,
    getTotal,
    updatingDocData,
    updatingSubDocData,
    togglingIsActiveDocData,
    togglingIsActiveSubdocData,
    softDeletingDocData,
    softDeletingSubdocData,
  });
}
