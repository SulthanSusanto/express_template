/**
 * Converts a value to an integer or returns 0 if conversion is not possible.
 *
 * @param {*} value - The value to be converted to an integer.
 * @returns {number} - The converted integer value or 0 if conversion is not possible.
 */
const convertToIntegerOrDefault = (value) => parseInt(value, 10) || 0;

export default convertToIntegerOrDefault;
