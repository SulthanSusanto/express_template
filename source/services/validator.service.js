import CustomError from '../utils/CustomError.js';

/**
 * Validates properties of an object against provided type validation rules.
 * Throws a CustomError if any property validation fails.
 *
 * @param {Object} objectToValidate - The object containing properties to be validated.
 * @param {TypeValidationConfig} typeValidation - The type validation rules for the properties.
 * @throws {CustomError} If any property fails validation, with an appropriate error message.
 */

const validateObjectProperties = (objectToValidate, typeValidation) => {
  for (let property in objectToValidate) {
    const value = objectToValidate[property];
    if (!typeValidation.validate(value)) {
      throw new CustomError(
        `${property}, ${typeValidation.errorMessage()}`,
        400,
      );
    }
  }
};

export default validateObjectProperties;
