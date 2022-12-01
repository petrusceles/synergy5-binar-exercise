const { ROLES } = require('../lib/const');
const CarRepositories = require('../repositories/carRepositories');
const acceptedSize = ['small','medium','large']
const cloudinary = require('../config/cloudinary')

function uploadToCloudinary(image) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image, (err, url) => {
        if (err) return reject(err);
        return resolve(url);
        })
    });
}
const createCarService = async ({name,price,size,user,file}) => {
    try {
        if (!name || !price || !size || !file) {
            return {
                status:"BAD_REQUEST",
                statusCode:400,
                message:"all fields (name, price, size, picture) must not be empty",
                data: {
                    created_car:null
                }
            }
        }

        const isCarSize = acceptedSize.includes(size)
        if (!isCarSize) {
            return {
                status:"BAD_REQUEST",
                statusCode:400,
                message:"size invalid",
                data: {
                    created_car:null
                }
            }
        }

        const created_id = user.id

        const {newCar, isCreated} = await CarRepositories.findOrCreateCar({name,price,size,created_id})

        if (!isCreated) {
            return {
                status:"BAD_REQUEST",
                statusCode:400,
                message:"car has already exist",
                data: {
                    created_car:null
                }
            }
        }

        const fileResponse = await uploadToCloudinary(file)
        

        return {
            status:"CREATED",
            statusCode:201,
            message:"new car added",
            data: {
                created_car:newCar
            }
        }

    } catch (err) {
        return {
            status:"INTERNAL_SERVER_ERROR",
            statusCode:500,
            message:err,
            data:{
                created_car:null
            }
        }
    }
}

const updateCarService = async ({id,name,price,size,user}) => {
    try {
        if (!name && !price && !size) {
            return {
                status:"BAD_REQUEST",
                statusCode:400,
                message:"no fields data received",
                data: {
                    updated_car:null
                }
            }
        }

        const updated_id = user.id;
        const updatedCar = await CarRepositories.updateCarById({id,name,price,size,updated_id});

        return {
            status:"OK",
            statusCode:200,
            message:"car updated",
            data: {
                updated_car:updatedCar
            }
        }
    } catch (err) {
        console.log(err)
        return {
            status:"INTERNAL_SERVER_ERROR",
            statusCode:500,
            message:err,
            data:{
                created_car:null
            }
        }
    }
}

const readAllCarService = async ({query}) => {
    try {
        const cars = await CarRepositories.readAllCar({query})
        if (!cars.length) {
            return {
                status:"NOT_FOUND",
                statusCode:404,
                message:"car not found",
                data:{
                    retrieved_car:null
                }
            }
        }

        return {
            status:"OK",
            statusCode:200,
            message:"car found",
            data:{
                retrieved_car:cars
            }
        }
    } catch (err) {
        return {
            status:"INTERNAL_SERVER_ERROR",
            statusCode:500,
            message:err,
            data:{
                created_car:null
            }
        }
    }
}

const readCarService = async ({id}) => {
    try {
        const car = await CarRepositories.readCarById({id})
        if (!car) {
            return {
                status:"NOT_FOUND",
                statusCode:404,
                message:"car not found",
                data:{
                    retrieved_car:null
                }
            }
        }
        return {
            status:"OK",
            statusCode:200,
            message:"car found",
            data:{
                retrieved_car:car
            }
        }
    } catch (err) {
        return {
            status:"INTERNAL_SERVER_ERROR",
            statusCode:500,
            message:err,
            data:{
                created_car:null
            }
        }
    }
}

const deleteCarService = async ({id,user}) => {
    try {
        const deleted_id = user.id;
        const deletedCar = await CarRepositories.deleteCarById({id,deleted_id})
        if (!deletedCar) {
            return {
                status:"NOT_FOUND",
                statusCode:404,
                message:"car not found",
                data:{
                    deleted_car:null
                }
            }
        }
        return {
            status:"OK",
            statusCode:200,
            message:"car deleted",
            data:{
                deleted_car:deletedCar
            }
        }
    } catch (err) {
        return {
            status:"INTERNAL_SERVER_ERROR",
            statusCode:500,
            message:err,
            data:{
                created_car:null
            }
        }
    }
}
module.exports = {
    createCarService,updateCarService,readAllCarService,readCarService,deleteCarService
}