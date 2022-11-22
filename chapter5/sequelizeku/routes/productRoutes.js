const productController = require('../controllers/productControllers');
const routes = require('express').Router();

routes.post('/', productController.create);
routes.get('/', productController.read)
routes.get('/:id', productController.readById)
routes.put('/:id', productController.updateById)
routes.delete('/:id', productController.deletedById)
module.exports = routes;