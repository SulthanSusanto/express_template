import validateObjectProperties from '../services/validator.service.js';
import typeConfigs from '../config/type.config.js';

/**
 * Creates a validated data object for a product, performs data validation using predefined type configurations,
 * and returns a set of accessor methods to retrieve validated data.
 *
 * @param {string} name - The name of the product.
 * @param {number} quantity - The quantity of the product.
 * @param {string} description - The description of the product (optional).
 * @returns {Object} An object with accessor methods to retrieve validated data.
 */

export default ({ name, quantity, description }) => {
  validateObjectProperties({ name, quantity }, typeConfigs.required);

  validateObjectProperties(
    { name, description: description || '' },
    typeConfigs.string,
  );
  validateObjectProperties({ quantity }, typeConfigs.number);

  return {
    getName: () => name,
    getDescription: () => description,
    getQuantity: () => quantity,
  };
};
