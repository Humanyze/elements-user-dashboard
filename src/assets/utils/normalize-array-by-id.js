const normalizeArrayById = (array, id = 'id') => array.reduce((dict, item) => ({
  ...dict,
  [item[id]]: item,
}), {});

export default normalizeArrayById;
