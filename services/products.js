const productsModel = require('../models/products');

const getAll = () => productsModel.getAll();

const getById = (id) => productsModel.getById(id);

const add = async (name, quantity) => {
  const [returnFromModels] = await productsModel.checkProductByName(name);
  
  if (returnFromModels.length === 0) return productsModel.add(name, quantity);

  throw new Error('Product already exists');
};

module.exports = {
  getAll,
  getById,
  add,
};