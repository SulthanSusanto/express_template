import mappingDefault from '../config/mapping.config.js';

export default (row) => ({
  id: row._id || '',
  name: row.name || '',
  description: row.description || '',
  quantity: row.quantity || 0,
  ...mappingDefault(row),
});
