const express = require('express');
const productsController = require('../controllers/products');
const middlewares = require('../middlewares');

const routes = express.Router();

routes.get('/', productsController.getAll);

routes.get('/:id', productsController.getById);

routes.delete('/:id', productsController.deleteById);

routes.use(middlewares.productValidation);

routes.post('/', productsController.add);

routes.put('/:id', productsController.updateById);

module.exports = routes;