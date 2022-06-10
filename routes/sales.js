const express = require('express');
const salesController = require('../controllers/sales');
const middlewares = require('../middlewares');

const routes = express.Router();

routes.get('/', salesController.getAll);

routes.get('/:id', salesController.getById);

routes.use(middlewares.salesValidation);

routes.post('/', salesController.add);

routes.put('/:id', salesController.update);

module.exports = routes;