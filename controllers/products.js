const express = require('express');
const productsService = require('../services/products');

const routes = express.Router();

routes.get('/', async (req, res) => {
  const [getProducts] = await productsService.getAll();

  res.status(200).json(getProducts);
});

routes.get('/:id', async (req, res) => {
  const { id } = req.params;
  const [getProductsById] = await productsService.getById(id);

  res.status(200).json(getProductsById[0]);
});

module.exports = routes;