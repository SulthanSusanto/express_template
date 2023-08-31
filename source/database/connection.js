import mongoose from 'mongoose';
import { DATABASE_URL_GLOBAL } from '../config/env.config.js';
import logger from '../config/logger.config.js';

/**
 * Establishes a connection to a MongoDB database using the provided URL.
 *
 * @param {string} dbUrl - The URL of the MongoDB database to connect to.
 * @returns {Promise} - A promise that resolves when the connection is established.
 */
const establishMongoDBConnection = async (dbUrl) => {
  return await mongoose.connect(dbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
};

/**
 * Establishes a connection to the MongoDB database.
 *
 * This function sets 'strictQuery' to false, connects to the database using the global URL,
 * and handles any connection errors by logging and exiting the process with an error code.
 */
const connectToMongoDB = async () => {
  try {
    // Set 'strictQuery' to false to allow more flexible querying.
    mongoose.set('strictQuery', false);

    // Establish a connection to the MongoDB database using the global URL.
    await establishMongoDBConnection(DATABASE_URL_GLOBAL);

    // Log a successful connection.
    logger.info(`Database connected successfully`);
  } catch (error) {
    // Log the error and exit the process with an error code.
    logger.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectToMongoDB;
