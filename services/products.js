const productsModel = require('../models/products');

const getAll = () => productsModel.getAll();

const getById = (id) => productsModel.getById(id);

const add = (name, quantity) => productsModel.add(name, quantity);

module.exports = {
  getAll,
  getById,
  add,
};