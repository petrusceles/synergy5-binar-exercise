const {Car,User} = require('../models');
const CAR_ATTRIBUTES = {
    include:[
        {
            model:User,
            as:'createdBy',
            attributes:['name','email']
        },
        {
            model:User,
            as:'updatedBy',
            attributes:['name','email']
        },
        {
            model:User,
            as:'deletedBy',
            attributes:['name','email']
        }
    ],
    attributes:{
        exclude:['created_id','updated_id','deleted_id']
    }
}
class CarRepositories {
    static async createCar({name,price,size,created_id,picture_url}) {
        const newCar= await Car.create({
                name,price,size,created_id,picture_url
        })

        return newCar
    }

    static async updateCarById({id,name,price,size,updated_id,picture_url}) {
        // console.log(id,name,price,updated_id)
        const updatedCar = await Car.update({
            name,price,size,updated_id,picture_url
        }, {
            where:{
                id,
                deletedAt:null
            }
        })

        return updatedCar
    }

    static async readAllCar({query}) {
        const cars = await Car.findAll({
            where:{
                ...query,
                deletedAt:null
            },
            ...CAR_ATTRIBUTES
        })
        return cars
    }

    static async readCarById({id}) {
        const car = await Car.findOne({
            where: {
                id,
                deletedAt:null
            },
            ...CAR_ATTRIBUTES
        });
        return car
    }

    static async deleteCarById({id,deleted_id}) {
        const deletedCar = await Car.update({
            deleted_id,
            deletedAt:new Date()
        },{
            where: {
                id,
                deletedAt:null
            }
        })
        return deletedCar
    }
}

module.exports = CarRepositories