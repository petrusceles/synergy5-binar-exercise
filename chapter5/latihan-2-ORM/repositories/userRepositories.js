const {User} = require('../models')
const {Op} = require('sequelize');
const createUser = async ({name,email,password,address}) => {
    const [newUser, isCreated] = await User.findOrCreate({
        where: {
            [Op.or]:{
                name,email
            }
        },
        defaults: {name,email,password,address}
    })

    return {
        newUser, isCreated
    }
}

const getUserByAny = async (query) => {
    const user = await User.findAll({
        where:query
    })
    
    return user
}

const getUserByEmail = async ({email}) => {
    const user = await User.findOne({
        where:{
            email
        }
    })
    return user;
}

const getUserById = async ({id}) => {
    const user = await User.findByPk(id);
    return user;
}
module.exports = {createUser,getUserByAny,getUserByEmail,getUserById};