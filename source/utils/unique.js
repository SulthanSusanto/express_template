/**
 * Removes duplicate elements from an array, creating a new array with unique elements.
 *
 * @param {Array} array - The input array possibly containing duplicate elements.
 * @returns {Array} - A new array containing only the unique elements from the input array.
 */
const removeDuplicates = (array) => {
  return Array.from(new Set(array));
};

export default removeDuplicates;
