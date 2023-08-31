import timestamps from '../config/timestamps.config.js';
import splitUrl from '../utils/split.js';

/**
 * Generates timestamps with user and description for tracking actions.
 *
 * @param {string} user - The user performing the action.
 * @param {string} originalUrl - The original URL associated with the action.
 * @returns {object} Timestamps object with user and description.
 */
const addTimestamps = (user, originalUrl) => {
  const [path, action] = splitUrl(originalUrl);
  return timestamps({
    user,
    description: `${action} ${path}`,
  });
};

/**
 * Inserts a new document with created timestamp.
 *
 * @param {object} options - Options for inserting the document.
 * @param {object} options.dbAccess - Database access object.
 * @param {object} options.newData - New data to insert.
 * @param {object} [options.user={}] - The user performing the action.
 * @param {string} options.originalUrl - The original URL associated with the action.
 * @returns {Promise} Resolves with the inserted document.
 */
const insertDoc = async ({ dbAccess, newData, user = {}, originalUrl }) => {
  const createdBy = addTimestamps(user, originalUrl);
  const dataToInsert = { ...newData, createdBy };
  return await dbAccess.insertingDocData(dataToInsert);
};

/**
 * Inserts a new sub-document within a specified field of a parent document.
 *
 * @param {object} options - Options for inserting the sub-document.
 * @param {object} options.dbAccess - Database access object.
 * @param {string} options.docId - ID of the parent document.
 * @param {string} options.subDocField - Field within the parent document to insert the sub-document.
 * @param {object} options.newData - New data for the sub-document.
 * @param {object} [options.user={}] - The user performing the action.
 * @param {string} options.originalUrl - The original URL associated with the action.
 * @returns {Promise} Resolves after the sub-document is inserted.
 */
const insertSubDoc = async ({
  dbAccess,
  docId,
  subDocField,
  newData,
  user = {},
  originalUrl,
}) => {
  const createdBy = addTimestamps(user, originalUrl);
  const dataToInsert = { ...newData, createdBy };
  return await dbAccess.insertingSubDocData(docId, subDocField, dataToInsert);
};

/**
 * Updates a document with new data and records the updater's timestamp.
 *
 * @param {object} options - Options for updating the document.
 * @param {object} options.dbAccess - Database access object.
 * @param {string} options.updatedDocId - ID of the document to update.
 * @param {object} options.updatedData - New data for updating the document.
 * @param {object} [options.user={}] - The user performing the action.
 * @param {string} options.originalUrl - The original URL associated with the action.
 * @returns {Promise} Resolves after the document is updated.
 */
const updateDoc = async ({
  dbAccess,
  updatedDocId,
  updatedData,
  user = {},
  originalUrl,
}) => {
  const updatedBy = addTimestamps(user, originalUrl);
  await dbAccess.updatingDocData(updatedDocId, updatedData, updatedBy);
};

/**
 * Updates a sub-document within a specified field of a parent document.
 *
 * @param {object} options - Options for updating the sub-document.
 * @param {object} options.dbAccess - Database access object.
 * @param {string} options.docId - ID of the parent document.
 * @param {string} options.subDocId - ID of the sub-document to update.
 * @param {string} options.field - Field within the parent document containing the sub-document.
 * @param {object} options.newData - New data for updating the sub-document.
 * @param {object} [options.user={}] - The user performing the action.
 * @param {string} options.originalUrl - The original URL associated with the action.
 * @returns {Promise} Resolves after the sub-document is updated.
 */
const updateSubDoc = async ({
  dbAccess,
  docId,
  subDocId,
  subDocField,
  updatedSubDocData,
  user = {},
  originalUrl,
}) => {
  const updatedBy = addTimestamps(user, originalUrl);
  return await dbAccess.updatingSubDocData(
    docId,
    subDocId,
    subDocField,
    updatedSubDocData,
    updatedBy,
  );
};

/**
 * toggle the 'isActive' field of a document.
 *
 * @param {object} options - Options for updating the 'isActive' field of the document.
 * @param {object} options.dbAccess - Database access object.
 * @param {string} options.id - ID of the document to update.
 * @param {object} [options.user={}] - The user performing the action.
 * @param {string} options.originalUrl - The original URL associated with the action.
 * @returns {Promise} Resolves after the 'isActive' field of the document is updated.
 */
const toggleIsActiveDoc = async ({
  dbAccess,
  updatedDocId,
  user = {},
  originalUrl,
}) => {
  const updatedBy = addTimestamps(user, originalUrl);
  await dbAccess.togglingIsActiveDocData(updatedDocId, updatedBy);
};

/**
 * toggle the 'isActive' field of a sub-document within a specified field of a parent document.
 *
 * @param {object} options - Options for updating the 'isActive' field of the sub-document.
 * @param {object} options.dbAccess - Database access object.
 * @param {string} options.docId - ID of the parent document.
 * @param {string} options.subDocId - ID of the sub-document to update.
 * @param {string} options.field - Field within the parent document containing the sub-document.
 * @param {object} [options.user={}] - The user performing the action.
 * @param {string} options.originalUrl - The original URL associated with the action.
 * @returns {Promise} Resolves after the 'isActive' field of the sub-document is updated.
 */
const toggleIsActiveSubDoc = async ({
  dbAccess,
  docId,
  subDocId,
  field,
  user = {},
  originalUrl,
}) => {
  const updatedBy = addTimestamps(user, originalUrl);
  return await dbAccess.togglingIsActiveSubdocData(
    docId,
    subDocId,
    field,
    updatedBy,
  );
};

/**
 * soft delete a document and records the deleter's timestamp.
 *
 * @param {object} options - Options for removing the document.
 * @param {object} options.dbAccess - Database access object.
 * @param {string} options.removedId - ID of the document to remove.
 * @param {object} [options.user={}] - The user performing the action.
 * @param {string} options.originalUrl - The original URL associated with the action.
 * @returns {Promise} Resolves after the document is removed.
 */
const softDeleteDoc = async ({
  dbAccess,
  removedId,
  user = {},
  originalUrl,
}) => {
  const deletedBy = addTimestamps(user, originalUrl);
  await dbAccess.softDeletingDocData(removedId, deletedBy);
};

/**
 * soft delete a sub-document within a specified field of a parent document and records deletion timestamp.
 *
 * @param {object} options - Options for removing the sub-document.
 * @param {object} options.dbAccess - Database access object.
 * @param {string} options.docId - ID of the parent document.
 * @param {string} options.subDocId - ID of the sub-document to remove.
 * @param {string} options.field - Field within the parent document containing the sub-document.
 * @param {object} [options.user={}] - The user performing the action.
 * @param {string} options.originalUrl - The original URL associated with the action.
 * @returns {Promise} Resolves after the sub-document is removed.
 */
const softDeleteSubDoc = async ({
  dbAccess,
  docId,
  subDocId,
  field,
  user = {},
  originalUrl,
}) => {
  const deletedBy = addTimestamps(user, originalUrl);
  return await dbAccess.softDeleteingSubDocData(
    docId,
    subDocId,
    field,
    deletedBy,
  );
};

export default {
  insertDoc,
  insertSubDoc,
  updateDoc,
  updateSubDoc,
  toggleIsActiveDoc,
  toggleIsActiveSubDoc,
  softDeleteDoc,
  softDeleteSubDoc,
};
