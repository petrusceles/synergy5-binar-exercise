const {Product} = require('../models')
const getProductByName = async ({name}) => {
    const product = await Product.findOne({
        where: {
            name
        }
    })
    return product
}

const createProduct = async ({name,price,stock}) => {
    const product = await Product.create({
        name,price,stock
    })
    return product
}

const getAllProductByAny = async (query) => {
    const products = await Product.findAll({
        where:query
    })
    return products
}

const getProductById = async ({id}) => {
    console.log(id)
    const product = await Product.findByPk(id);
    return product
}

const updateProductById = async ({id,body}) => {
    const product = await Product.update(body, {
        where:{
            id
        }
    })
    return product
}

const deleteProductById = async ({id}) => {
    const product = await Product.destroy({
        where: {
            id
        }
    })

    return product
}

module.exports = {
    getProductByName,createProduct,getAllProductByAny,getProductById,updateProductById,deleteProductById
}