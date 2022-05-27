const productsModel = require('../models/products');

const getAll = () => {
  const getAllProducts = productsModel.getAll();
  return getAllProducts;
};

const getById = (id) => {
  const getProductById = productsModel.getById(id);
  return getProductById;
};

module.exports = {
  getAll,
  getById,
};