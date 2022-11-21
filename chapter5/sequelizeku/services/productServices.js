const productRepository = require('../repositories/productRepositories')


const createProduct = async ({name, price, stock}) => {
    if (name==null || price==null|| stock==null) {
        return res.status(400).json({
            status:"BAD_REQUEST",
            message:"each fields must not be empty",
            data:{
                added_product:null
            }
        })
    }

    const isProductNameExist = await productRepository.getProductByName({name});
    
    if (isProductNameExist) {
        return res.status(400).json({
            status:"BAD_REQUEST",
            message:`product name:${name} is already exist`,
            data:{
                added_product:null
            }
        })
    }

    const newProduct = await productRepository.createProduct({name,price,stock})

    return newProduct;
}

module.exports = {
    createProduct
}