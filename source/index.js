import app from './app.js';
import { PORT } from './config/env.config.js';
import logger from './config/logger.config.js';

app.listen(PORT, () => {
  logger.info(`Listening to port ${PORT}`);
});
