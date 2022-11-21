const productServices = require('../services/productServices');

module.exports = {
    create: async (req,res) => {
        const product = await productServices.createProduct(req.body)
        
        return res.status(201).json({
            status:"CREATED",
            message:`product created`,
            data:{
                added_product:product
            }
        })
    }
}