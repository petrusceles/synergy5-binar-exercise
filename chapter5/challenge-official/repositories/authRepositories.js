const {User} = require('../models');
const {Op} = require('sequelize');

const findOrCreateUser = async ({name,email,password,role}) => {
    const [createdUser, isCreated] = await User.findOrCreate({
        where:{
            [Op.or]:{
                name,email
            }
        },
        defaults:{
            name,email,password,role
        }
    })

    return {createdUser,isCreated}
}

const findUserByEmail = async ({email}) => {
    const user = await User.findOne({
        where:{
            email
        }
    })
    return user;
}

module.exports = {
    findOrCreateUser,findUserByEmail
}