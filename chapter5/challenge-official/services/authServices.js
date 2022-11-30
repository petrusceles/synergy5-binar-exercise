const bcrypt = require('bcrypt')
const authRepositories = require('../repositories/authRepositories');
const authValidator = require('../lib/validator');
const jwt = require('jsonwebtoken');
const userRegisterService = async ({name,email,password,role}) => {
    try {
        if (!name || !email || !password || !role) {
            return {
                status:"BAD_REQUEST",
                statusCode:400,
                message:"all fields (name, email, password, role) must not be empty",
                data: {
                    registered_user:null
                }
            }
        }

        const isValid = authValidator.userRegisterCheck({name,email,password,role})

        if (isValid.length) {
            return {
                status:"BAD_REQUEST",
                statusCode:400,
                message:"err",
                data: {
                    registered_user:null
                }
            }
        }
    
        const encryptedPassword = await bcrypt.hash(password, process.env.SALT_ROUND);
    
        const {createdUser, isCreated} = await authRepositories.findOrCreateUser({name,email,password:encryptedPassword,role})
    
        if (!isCreated) {
            return {
                status:"BAD_REQUEST",
                statusCode:400,
                message:"user is already exist",
                data: {
                    registered_user:null
                }
            }
        }
    
        return {
            status:"OK",
            statusCode:201,
            message:"user registered",
            data: {
                registered_user:{
                    name:createdUser.name,
                    email:createdUser.email,
                    role:createdUser.role
                }
            }
        }
    } catch (err) {
        return {
            status:"INTERNAL_SERVER_ERROR",
            statusCode:500,
            message:err,
            data: {
                registered_user:null
            }
        }
    }
}

const userLoginService = async ({email,password}) => {
    try {
        if (!email || !password) {
            return {
                status:"BAD_REQUEST",
                statusCode:400,
                message:'all fields (email, password) must not be empty',
                data: {
                    logged_user:null
                }
            }
        }

        const isValid = authValidator.userLoginCheck({email,password});
        if (isValid.length) {
            return {
                status:"BAD_REQUEST",
                statusCode:400,
                message:isValid,
                data: {
                    logged_user:null
                }
            }
        }

        const userExist = await authRepositories.findUserByEmail({email});

        if (!userExist) {
            return {
                status:"NOT_FOUND",
                statusCode:404,
                message:"user not found",
                data: {
                    logged_user:null
                }
            }
        }

        const isPasswordValid = await bcrypt.compare(password, userExist.password);

        if (!isPasswordValid) {
            return {
                status:"BAD_REQUEST",
                statusCode:401,
                message:"password incorrect",
                data: {
                    logged_user:null
                }
            }
        }

        const userPayload = {
            email,role:userExist.role
        }

        const token = jwt.sign(userPayload, process.env.JWT_SECRET, {
            expiresIn:process.env.JWT_VALIDITY_PERIOD
        })

        return {
            status:"OK",
            statusCode:200,
            message:"user logged in",
            data: {
                logged_user:{
                    id:userExist.id,
                    name:userExist.name,
                    email:userExist.email,
                    role:userExist.role
                },
                token
            }
        }
    } catch (err) {
        return {
            status:"INTERNAL_SERVER_ERROR",
            statusCode:500,
            message:err,
            data: {
                logged_user:null
            }
        }
    }
}

module.exports = {
    userRegisterService,userLoginService
}