const salesModels = require('../models/sales');

const getAll = () => {
  const allSales = salesModels.getAll();
  return allSales;
};

const getById = (id) => {
  const saleById = salesModels.getById(id);
  return saleById;
};

module.exports = {
  getAll,
  getById,
};