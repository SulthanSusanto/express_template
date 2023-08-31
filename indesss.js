const getCurrentDateTime = () => {
  const utcDate = new Date(); // Get the current UTC date and time.
  const localOffset = utcDate.getTimezoneOffset(); // Get the local time offset in minutes.

  // Create a new local date by subtracting the local time offset from the UTC date.
  const localDate = new Date(utcDate.getTime() - localOffset * 60 * 1000);

  return localDate; // Return the current local date and time.
};

console.log(getCurrentDateTime());
console.log(new Date());

const getCurrentDateTimeHasOption = ({
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

// Example usage: Add 1 year, 3 months, 2 days, 3 hours, 15 minutes, and 30 seconds to the current date and time.
const updatedDate = getCurrentDateTimeHasOption({ minutes: 30 })
  .getMonth()
  .toLocaleString();

console.log(updatedDate);
