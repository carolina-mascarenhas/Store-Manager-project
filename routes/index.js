const express = require('express');

const routes = express.Router();

routes.use('/products', require('../controllers/products'));

module.exports = routes;