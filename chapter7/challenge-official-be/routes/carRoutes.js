const express = require('express');
const routes = express.Router();
const carControllers = require('../controllers/carControllers');
const authMiddlewares = require('../middlewares/authMiddlewares');
const upload = require("../middlewares/fileUpload");
const fileEncoder = require("../middlewares/fileEncoder")
routes.post('/',upload.single("picture"),fileEncoder.fileEncoder,authMiddlewares.checkToken,authMiddlewares.adminAuth,carControllers.createCar);
routes.put('/:id',upload.single("picture"),fileEncoder.fileEncoder,authMiddlewares.checkToken,authMiddlewares.adminAuth,carControllers.updateCar)
routes.get('/', carControllers.readAllCar)
routes.get('/:id', carControllers.readCar)
routes.delete('/:id', authMiddlewares.checkToken,authMiddlewares.adminAuth, carControllers.deleteCar)
module.exports = routes;