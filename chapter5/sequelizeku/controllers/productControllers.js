const productServices = require('../services/productServices');

module.exports = {
    create: async (req,res) => {
        const {name,price,stock} = req.body;
        const {status, statusCode, message, data} = await productServices.createProduct({
            name,price,stock
        })
        return res.status(statusCode).json({
            status,
            message,
            data
        })
    },

    read: async (req,res) => {
        const {status, statusCode, message, data} = await productServices.getProduct(req.query)
        return res.status(statusCode).json({
            status,
            message,
            data
        })
    },

    readById: async (req,res) => {
        const {id} = req.params;
        const {status, statusCode, message, data} = await productServices.getProductById(id)
        return res.status(statusCode).json({
            status,
            message,
            data
        })
    },

    updateById: async (req,res) => {
        const {id} = req.params;
        const {status, statusCode, message, data} = await productServices.updateProductById({id,body:req.body})
        return res.status(statusCode).json({
            status,
            message,
            data
        })
    },

    deletedById: async (req,res) => {
        const {id} = req.params;
        const {status, statusCode, message, data} = await productServices.deleteProductById({id})
        return res.status(statusCode).json({
            status,
            message,
            data
        })
    }
}