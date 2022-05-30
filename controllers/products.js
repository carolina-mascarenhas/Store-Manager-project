const express = require('express');
const productsService = require('../services/products');

const routes = express.Router();

routes.get('/', async (req, res) => {
  const [getProducts] = await productsService.getAll();

  res.status(200).json(getProducts);
});

routes.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const [getProductsById] = await productsService.getById(id);

    if (getProductsById.length === 0) throw new Error('Product not found');

    res.status(200).json(getProductsById[0]);
  } catch (e) {
    next({ status: 404, message: e.message });
    // res.status(404).json({ message: e.message });
  }
});

module.exports = routes;