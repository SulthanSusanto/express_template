import mappingDefault from '../config/mapping.config.js';
import productMapping from './product.mapping.js';

export default (row) => ({
  id: row._id || '',
  name: row.name || '',
  products: productMapping(row.products) || [],
  ...mappingDefault(row),
});
