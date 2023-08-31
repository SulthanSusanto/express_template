/**
 * Retrieves the last two digits of the current year.
 *
 * @returns {string} - The last two digits of the current year.
 */
const getShortYear = () => {
  // Get the current year, convert it to a string, and retrieve the last two characters.
  return new Date().getFullYear().toString().substr(-2);
};

/**
 * Retrieves the current year as a four-digit string.
 *
 * @returns {string} - The current year as a four-digit string.
 */
const getCurrentFullYear = () => {
  // Get the current year, convert it to a string.
  return new Date().getFullYear().toString();
};

/**
 * Retrieves the current month as a two-digit string.
 *
 * @returns {string} - The current month as a two-digit string.
 */
const getCurrentMonth = () => {
  // Get the current month (0-11) and add 1 to get the correct month value (1-12).
  const currentMonth = new Date().getMonth() + 1;
  return currentMonth.toString().padStart(2, '0'); // Ensure a two-digit format.
};

/**
 * Adds a specified number of days to a given date.
 *
 * @param {Date} date - The input date to which days will be added.
 * @param {number} days - The number of days to add to the input date.
 * @returns {Date} - A new date representing the input date plus the specified days.
 */
const addDaysToDate = (date, days) => {
  const result = new Date(date); // Create a new date object to avoid modifying the input date.
  result.setDate(result.getDate() + days); // Add the specified number of days to the new date.
  return result; // Return the new date with added days.
};

/**
 * Retrieves the current local date and time.
 * @returns {Date} - The current local date and time.
 */
const getCurrentDateTime = ({
  years = 0,
  months = 0,
  days = 0,
  hours = 0,
  minutes = 0,
  seconds = 0,
} = {}) => {
  const utcDate = new Date(); // Get the current UTC date and time.
  const localOffset = utcDate.getTimezoneOffset(); // Get the local time offset in minutes.

  // Create a new local date by subtracting the local time offset from the UTC date.
  const localDate = new Date(utcDate.getTime() - localOffset * 60 * 1000);

  // Add years, months, days, hours, minutes, and seconds to the local date.
  localDate.setFullYear(localDate.getFullYear() + years);
  localDate.setMonth(localDate.getMonth() + months);
  localDate.setDate(localDate.getDate() + days);
  localDate.setHours(localDate.getHours() + hours);
  localDate.setMinutes(localDate.getMinutes() + minutes);
  localDate.setSeconds(localDate.getSeconds() + seconds);

  return localDate; // Return the updated local date and time.
};

export default {
  getShortYear,
  getCurrentFullYear,
  getCurrentMonth,
  addDaysToDate,
  getCurrentDateTime,
};
