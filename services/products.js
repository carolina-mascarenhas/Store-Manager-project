const productsModel = require('../models/products');

const getAll = () => productsModel.getAll();

const getById = async (id) => {
  const [checkId] = await productsModel.getById(id);

  if (checkId.length !== 0) return productsModel.getById(id);

  throw new Error('Product not found');
}; 

const add = async (name, quantity) => {
  const [returnFromModels] = await productsModel.checkProductByName(name);
  
  if (returnFromModels.length === 0) return productsModel.add(name, quantity);

  throw new Error('Product already exists');
};

const updateById = async (name, id, quantity) => {
  const [checkId] = await productsModel.getById(id);

  if (checkId.length !== 0) return productsModel.updateById(name, id, quantity);
  
  throw new Error('Product not found');
};

const deleteById = async (id) => {
  const [checkId] = await productsModel.getById(id);

  if (checkId.length !== 0) return productsModel.deleteById(id);

  throw new Error('Product not found');
};

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
};