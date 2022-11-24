const productRepository = require('../repositories/productRepositories')
const acceptedParameters = ['name','price','stock']

const createProduct = async ({name, price, stock}) => {
    try {
        if (name==null || price==null|| stock==null) {
            return {
                status:"BAD_REQUEST",
                statusCode:400,
                message:"each fields must not be empty",
                data:{
                    added_product:null
                }
            }
        }
    
        const isProductNameExist = await productRepository.getProductByName({name});
        
        if (isProductNameExist) {
            return {
                status:"BAD_REQUEST",
                statusCode:400,
                message:`product name:${name} is already exist`,
                data:{
                    added_product:null
                }
            }
        }
    
        const newProduct = await productRepository.createProduct({name,price,stock})
    
        return {
            status:"CREATED",
            statusCode:201,
            message:`product created`,
            data:{
                added_product:newProduct
            }
        };
    } catch (err) {
        return {
            status:"INTERNAL_SERVER_ERROR",
            statusCode:500,
            message:err,
            data:{
                added_product:null
            }
        };
    }
}

const getProduct = async (query) => {
    try {
        const products = await productRepository.getAllProductByAny(query);
        if (!products.length) {
            return {
                status:"NOT_FOUND",
                statusCode:404,
                message:`no product with: ${JSON.stringify(query)}`,
                data:{
                    retrieved_product:null
                }
            }
        }

        return {
            status:"OK",
            statusCode:200,
            message:"product retrieved",
            data:{
                retrieved_product:products
            }
        };
    } catch (err) {
        return {
            status:"INTERNAL_SERVER_ERROR",
            statusCode:500,
            message:err,
            data:{
                retrieved_product:null
            }
        };
    }
}

const getProductById = async ({id}) => {
    try {
        const product = await productRepository.getProductById({id});
        console.log(product)
        if (!product) {
            return {
                status:"NOT_FOUND",
                statusCode:404,
                message:`no product with id ${id}`,
                data:{
                    retrieved_product:null
                }
            }
        }

        return {
            status:"OK",
            statusCode:200,
            message:`product retrieved`,
            data:{
                retrieved_product:product
            }
        }
    } catch (err) {
        return {
            status:"INTERNAL_SERVER_ERROR",
            statusCode:500,
            message:err,
            data:{
                retrieved_product:null
            }
        };
    }
}

const updateProductById = async ({id, body}) => {
    try {
        for (object in body) {
            if(!acceptedParameters.includes(object)) {
                return {
                    status:"BAD_REQUEST",
                    statusCode:400,
                    message:"unaccepted body",
                    data:{
                        retrieved_product:null
                    }
                }
            }
        }

        const updatedProduct = await productRepository.updateProductById({id,body});
        if (updatedProduct[0]==0) {
            return {
                status:"NOT_FOUND",
                statusCode:404,
                message:`no product with id ${id}`,
                data:{
                    updated_product:null
                }
            }
        }

        return {
            status:"OK",
            statusCode:200,
            message:`product updated`,
            data:{
                updated_product:updatedProduct
            }
        }

    } catch (err) {
        return {
            status:"INTERNAL_SERVER_ERROR",
            statusCode:500,
            message:err,
            data:{
                updated_product:null
            }
        };
    }
}

const deleteProductById = async ({id}) => {
    try {
        const deletedProduct = await productRepository.deleteProductById({id})
        if (deletedProduct == 0) {
            return {
                status:"NOT_FOUND",
                statusCode:404,
                message:`no product with id ${id}`,
                data:{
                    deleted_product:null
                }
            }
        }

        return {
            status:"OK",
            statusCode:200,
            message:`product deleted`,
            data:{
                deleted_product:deletedProduct
            }
        }

    } catch (err) {
        return {
            status:"INTERNAL_SERVER_ERROR",
            statusCode:500,
            message:err,
            data:{
                deleted_product:null
            }
        };
    }
}

module.exports = {
    createProduct, getProduct,getProductById,updateProductById,deleteProductById
}