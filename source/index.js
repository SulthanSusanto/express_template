import app from './app.js';
import { PORT } from './config/env.config.js';
import logger from './config/logger.config.js';
import moment from 'moment';

app.listen(PORT, () => {
  const accessTokenExpires = moment().add(30, 'minutes');

  console.log(accessTokenExpires);
  console.log(accessTokenExpires.toDate());

  logger.info(`Listening to port ${PORT}`);
});
