const timestampsMapping = (row) => ({
  userId: row.userId || '',
  name: row.name || '',
  date: row.date || '',
  description: row.description || '',
});

const mappingDefault = (row) => ({
  isActive: row.isActive || false,
  createdBy: timestampsMapping(row.createdBy) || {},
  updatedby: row.updatedBy.map((value) => timestampsMapping(value)) || [],
  deletedBy: timestampsMapping(row.deletedBy) || {},
});

export default mappingDefault;
