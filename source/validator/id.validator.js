import validateObjectProperties from '../services/validator.service.js';
import typeConfigs from '../config/type.config.js';

/**
 * Creates a validated ID object using MongoDB ID validation configuration,
 * and returns an accessor method to retrieve the validated ID.
 *
 * @param {string} id - The MongoDB ID to be validated.
 * @returns {Object} An object with an accessor method to retrieve the validated ID.
 */
export default ({ id }) => {
  validateObjectProperties({ id }, typeConfigs.mongodbId);

  return {
    getId: () => id,
  };
};
