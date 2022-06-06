const express = require('express');
const salesService = require('../services/sales');
const middlewares = require('../middlewares');

const routes = express.Router();

routes.get('/', async (_req, res) => {
  const [getAllSales] = await salesService.getAll();

  res.status(200).json(getAllSales);
});

routes.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const getSalesById = await salesService.getById(id);

    if (getSalesById.length === 0) throw new Error('Sale not found');

    res.status(200).json(getSalesById);
  } catch (e) {
    next({ status: 404, message: e.message });
  }
});

routes.use(middlewares.salesValidation);

routes.post('/', async (req, res) => {
  // const { productId, quantity, arr } = req.body;

  const newSale = await salesService.add(req.body);

  res.status(201).json(newSale);
});

module.exports = routes;