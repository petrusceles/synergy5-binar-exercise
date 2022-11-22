const routes = require('express').Router();
const productRoutes = require('./productRoutes');

routes.use("/product",productRoutes);

module.exports = routes;