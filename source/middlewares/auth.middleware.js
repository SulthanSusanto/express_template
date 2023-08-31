import { decodedToken } from '../utils/jwt.js';
import { ACCESS_TOKEN_SECRET } from '../config/env.config.js';

import makeUserDb from '../database/repository/user.repository.js';

import CustomError from '../utils/CustomError.js';
// import pathSplitter from '../lib/utils/split.js';

const userAccess = makeUserDb();

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new CustomError('Unauthorized, token failed', 401);

    const decoded = decodedToken({ token, secret: ACCESS_TOKEN_SECRET });
    if (!decoded || decoded.type !== 'access')
      throw new CustomError('Unauthorized, token failed', 401);

    const user = await userAccess.findById(decoded.sub);
    if (!user.isActive)
      throw new CustomError('Unauthorized, token failed', 401);

    user.password = undefined;
    req.user = user;

    next();
  } catch (err) {
    return res
      .status(err.statusCode)
      .send({ error: 'An unknown error occurred', message: err.message });
  }
};

export default { protect };
