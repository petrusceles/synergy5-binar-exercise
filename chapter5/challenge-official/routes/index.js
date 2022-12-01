const authRoutes = require('./authRoutes');
const carRoutes = require('./carRoutes');
const routes = require('express').Router();

routes.use('/auth', authRoutes);
routes.use('/car', carRoutes);

module.exports = routes