const {Car,User} = require('../models');
const CAR_ATTRIBUTES = {
    include:[
        {
            model:User,
            as:'created_by',
            attributes:['name','email']
        },
        {
            model:User,
            as:'updated_by',
            attributes:['name','email']
        },
        {
            model:User,
            as:'deleted_by',
            attributes:['name','email']
        }
    ],
    attributes:{
        exclude:['created_id','updated_id','deleted_id']
    }
}
class CarRepositories {
    static async findOrCreateCar({name,price,size,created_id}) {
        const [newCar,isCreated] = await Car.findOrCreate({
            where: {
                name
            },
            defaults: {
                name,price,size,created_id
            }
        })

        return {newCar,isCreated}
    }

    static async updateCarById(data) {
        // console.log(id,name,price,updated_id)
        const {id,name,price,size,updated_id} = data
        const updatedCar = await Car.update({
            name,price,size,updated_id
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