import endpointService from '../services/endpoint.service.js';
import paginationService from '../services/pagination.service.js';

import makeCategoryDb from '../database/repository/category.repository.js';

import idValidator from '../validator/id.validator.js';
import categoryValidator from '../validator/category.validator.js';
import productValidator from '../validator/product.validator.js';

import mappingCategory from '../mapping/category.mapping.js';

import createResponse from '../utils/response.js';

const validatorDoc = categoryValidator;
const validatorSubDoc = productValidator;
const mapping = mappingCategory;
const dbAccess = makeCategoryDb();

const add = async (req) => {
  const { body, user, originalUrl } = req;

  const validatedDocData = validatorDoc(body);

  const subDocData = body.products.map((subDocData) => {
    const { name, description, quantity } = subDocData;
    const validatedSubDocData = validatorSubDoc({
      name,
      description,
      quantity,
    });

    return validatedSubDocData;
  });

  const newData = {
    name: validatedDocData.getName(),
    products: subDocData,
  };

  const insertedDocument = await endpointService.insertDoc({
    dbAccess,
    newData,
    user,
    originalUrl,
  });

  return createResponse(mapping(insertedDocument));
};

const list = async (req) => {
  const { query } = req;
  const { page, limit } = query;

  const paginateData = await paginationService.paginatingFromDB(
    dbAccess,
    mapping,
    query,
    page || 1,
    limit || 10,
  );

  return createResponse(paginateData);
};

const update = async (req) => {
  const {
    params: { documentId },
    body,
    user,
    originalUrl,
  } = req;

  const updatedDocId = idValidator(documentId).getId();

  const validatedData = validatorDoc(body);

  const updatedData = {
    name: validatedData.getName(),
  };

  const updatedDocument = endpointService.updateDoc({
    dbAccess,
    updatedDocId,
    updatedData,
    user,
    originalUrl,
  });

  return createResponse(mapping(updatedDocument), 'data updated');
};

const toggleIsActive = async (req) => {
  const {
    params: { documentId },
    user,
    originalUrl,
  } = req;

  const updatedDocId = idValidator(documentId).getId();

  const updatedDocument = await endpointService.toggleIsActiveDoc({
    dbAccess,
    updatedDocId,
    user,
    originalUrl,
  });

  return createResponse(mapping(updatedDocument), 'isActive data was toggled');
};

const remove = async (req) => {
  const {
    params: { documentId },
    user,
    originalUrl,
  } = req;

  const removedId = idValidator(documentId).getId();

  const removedDocument = await endpointService.removeDoc({
    dbAccess,
    removedId,
    user,
    originalUrl,
  });
  return createResponse(mapping(removedDocument), 'data was removed');
};

export default {
  add,
  list,
  update,
  toggleIsActive,
  remove,
};
