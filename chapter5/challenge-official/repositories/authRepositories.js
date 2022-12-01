const {User,Role} = require('../models');
const {Op} = require('sequelize');

const findOrCreateUser = async ({name,email,password,role_id}) => {
    const [createdUser, isCreated] = await User.findOrCreate({
        where:{
            [Op.or]:{
                name,email
            }
        },
        defaults:{
            name,email,password,role_id
        }
    })

    return {createdUser,isCreated}
}

const findUserByEmail = async ({email}) => {
    const user = await User.findOne({
        where:{
            email
        },
        include: [{
            model:Role,
            as:"role",
            attributes:['id','name']
        }]
    })
    return user;
}

module.exports = {
    findOrCreateUser,findUserByEmail
}