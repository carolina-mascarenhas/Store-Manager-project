const express = require('express');
const middlewares = require('../middlewares');

const routes = express.Router();

routes.use('/products', require('../controllers/products'));

routes.use('/sales', require('../controllers/sales'));

routes.use(middlewares.error);

module.exports = routes;