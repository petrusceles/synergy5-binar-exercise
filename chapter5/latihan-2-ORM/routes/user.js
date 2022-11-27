const express = require('express');
const routes = express.Router();
const userControllers = require('../controllers/userControllers');
const userMiddlewares = require('../middlewares/userMiddlewares');

routes.post('/', userControllers.create);
routes.get('/', userControllers.read);
routes.get('/:id', userMiddlewares.tokenAccess, userControllers.readProfile);
routes.post('/login', userControllers.login);

module.exports = routes;