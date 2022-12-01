const express = require('express');
const routes = express.Router();
const authControllers = require('../controllers/authControllers');
const authMiddlewares = require('../middlewares/authMiddlewares');
routes.post('/register',authControllers.userRegister);
routes.post('/login', authControllers.userLogin);
routes.get('/me', authMiddlewares.checkToken, authControllers.userProfile);
routes.post('/register/admin',authMiddlewares.checkToken, authMiddlewares.superAdminAuth, authControllers.userAdminRegister);
module.exports = routes;