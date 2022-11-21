const {Product} = require('../models')
const getProductByName = async ({name}) => {
    try {
        const getProductName = await Product.findOne({
            where: {
                name
            }
        })
        return getProductName
    } catch (err) {
        return res.status(500).json({
            status:"INTERNAL_SERVICE_ERROR",
            message:err,
            data:null
        })
    }
}

const createProduct = async ({name,price,stock}) => {
    try {
        const newProduct = await Product.create({
            name,price,stock
        })
        return newProduct
    } catch (err) {
        return res.status(500).json({
            status:"INTERNAL_SERVICE_ERROR",
            message:err,
            data:null
        })
    }
}

module.exports = {
    getProductByName,createProduct
}