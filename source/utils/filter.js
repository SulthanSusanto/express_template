/**
 * Generates a filter object based on the provided parameters.
 *
 * @param {Object} query - Parameters for generating the filter object.
 * @param {string} query.isActive - A string indicating whether the item should be active ('true') or not.
 * @returns {Object} - The generated filter object with applied filters.
 */
const generateFilter = (query = {}) => {
  const filterObject = {};

  // Check if the 'isActive' parameter is provided and is a string.
  if (typeof query.isActive === 'string') {
    // Convert the 'isActive' string to a boolean value and assign it to the 'filterObject.isActive' property.
    filterObject.isActive = query.isActive === 'true';
  }

  return filterObject;
};

export default generateFilter;
