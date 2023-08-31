import Token from '../models/admin/token.model.js';
import { ServerError } from '../../utils/ApiError.js';
import { REFRESH } from '../../config/token.config.js';

const insert = async (data) => {
  return await Token.create(data);
};

const findByFilter = async ({ filters, limit, skip }) => {
  if (skip || limit) {
    const data = await Token.find(filters, {}, { limit, skip });
    return data;
  }
  const data = await Token.find(filters);
  return data;
};

const find = async () => {
  const data = await Token.find().lean();
  return data;
};

const findOneByOptional = async (query) => {
  const data = await Token.findOne(query);

  if (!data) throw new ServerError('Token not found', 400);
  return data;
};

const findByToken = async (token) => {
  const data = await Token.findOne({ token });
  if (!data) throw new ServerError('Token not found', 400);
  return data;
};

const findById = async (id) => {
  const data = await Token.findOne({ _id: id });
  if (!data) {
    throw new ServerError('Token not found', 400);
  }

  return data;
};

const total = async (filters) => {
  const data = await Token.countDocuments(filters);
  return data;
};

const removeByRefreshtoken = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({
    token: refreshToken,
    type: REFRESH,
    blacklisted: false,
  });

  if (!refreshTokenDoc) {
    throw new ServerError('Token not found', 400);
  }

  await refreshTokenDoc.remove();
};

const removeManyByUserIdAndType = async ({ user, type }) => {
  await Token.deleteMany({ user, type });
};

const blacklist = async (id) => {
  const data = await Token.findOne({ _id: id });
  if (!data) {
    throw new ServerError('Token not found', 400);
  }

  if (!data.isActive) {
    data.blacklisted = true;
  } else {
    throw new ServerError('Data already blacklist', 400);
  }

  await data.save();
};

export default function makeTokenDb() {
  return Object.freeze({
    insert,
    find,
    findByFilter,
    findByToken,
    findOneByOptional,
    findById,
    total,
    blacklist,
    removeByRefreshtoken,
    removeManyByUserIdAndType,
  });
}
