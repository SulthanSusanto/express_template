import validateObjectProperties from '../services/validator.service.js';
import typeConfigs from '../config/type.config.js';

/**
 * Creates a validated category name object, performs data validation using predefined type configurations,
 * and returns a set of accessor methods to retrieve validated data.
 *
 * @param {string} name - The name of the category.
 * @returns {Object} An object with accessor methods to retrieve validated category name.
 */
export default ({ name }) => {
  validateObjectProperties({ name }, typeConfigs.required);
  validateObjectProperties({ name }, typeConfigs.string);

  return {
    getName: () => name,
  };
};
