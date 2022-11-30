const express = require('express');
const routes = express.Router();
const authControllers = require('../controllers/authControllers');

routes.post('/register', authControllers.userRegister);
routes.post('/login', authControllers.userLogin);

module.exports = routes;