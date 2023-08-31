import date from '../utils/date.js';

const timestamps = ({ user, description = '' }) => ({
  userId: user._id,
  name: user.name,
  date: date.getCurrentDateTime(),
  description,
});

export default timestamps;
