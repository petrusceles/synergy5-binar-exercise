const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SALT_ROUND=10;
const userRepositories = require('../repositories/userRepositories');
const createUser = async ({name,email,password,address}) => {
    try {
        if (!name || !email || !password || !address) {
            return {
                status:"BAD_REQUEST",
                statusCode:400,
                message:"all field must not be empty",
                data: {
                    created_user:null
                }
            }
        }

        const encryptedPassword = await bcrypt.hash(password,SALT_ROUND);
        const {newUser, isCreated} = await userRepositories.createUser({
            name,email,password:encryptedPassword,address
        })
        if (!isCreated) {
            return {
                status:"BAD_REQUEST",
                statusCode:400,
                message:"user already exist",
                data: {
                    created_user:null
                }
            }
        }
        return {
            status:"CREATED",
            statusCode:201,
            message:"user created",
            data: {
                created_user:newUser
            }
        }

    } catch (err) {
        return {
            status:"INTERNAL_SERVICE_ERROR",
            statusCode:404,
            message:err,
            data: {
                created_user:null
            }
        }
    }
}

const getUser = async (query) => {
    try {
        const userRetrieved = await userRepositories.getUserByAny(query);
        if (!userRetrieved) {
            return {
                status:"NOT_FOUND",
                statusCode:404,
                message:`user with ${JSON.stringify(query)} is not found`,
                data: {
                    retrieved_user:null
                }
            }
        }

        return {
            status:"OK",
            statusCode:200,
            message:`user found`,
            data: {
                retrieved_user:userRetrieved
            }
        }
    } catch (error) {
        return {
            status:"INTERNAL_SERVICE_ERROR",
            statusCode:500,
            message:error,
            data: {
                created_user:null
            }
        }
    }
}

const userLogin = async ({email,password}) => {
    try {
        if (!email || !password) {
            return {
                status:"BAD_REQUEST",
                statusCode:400,
                message:`all field must not be empty`,
                data: {
                    logged_user:null,
                    token:null
                }
            }
        }

        const user = await userRepositories.getUserByEmail({email});

        if (!user) {
            return {
                status:"NOT_FOUND",
                statusCode:404,
                message:`user with email ${email} not found`,
                data: {
                    logged_user:null,
                    token:null
                }
            }
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        console.log(isPasswordMatch)

        if (!isPasswordMatch) {
            return {
                status:"BAD_REQUEST",
                statusCode:400,
                message:"password did not match",
                data: {
                    logged_user:null,
                    token:null
                }
            }
        }

        const accessToken = jwt.sign({
            email:user.email
        }, process.env.JWT_SECRET,{
            expiresIn:process.env.JWT_EXPIRED
        })

        return {
            status:"OK",
            statusCode:200,
            message:"user logged in",
            data: {
                logged_user:{
                    name:user.name,
                    email:user.email
                },
                token:accessToken
            }
        }
    } catch (err) {
        return {
            status:"INTERNAL_SERVICE_ERROR",
            statusCode:500,
            message:err,
            data: {
                logged_user:null,
                token:null
            }
        }
    }
}

const userGetProfile = async ({reqId, email}) => {
    try {
        if (!reqId) {
            return {
                status:"BAD_REQUEST",
                statusCode:400,
                message:"id information needed",
                data: {
                    retrieved_user:null
                }
            }
        }

        const user = await userRepositories.getUserById({id:reqId})
        if (!user) {
            return {
                status:"NOT_FOUND",
                statusCode:404,
                message:"user not found",
                data: {
                    retrieved_user:null
                }
            }
        }

        if (user.email != email) {
            return {
                statis:"UNAUTHORIZED",
                statusCode:401,
                message:"user unauthorized",
                data: {
                    retrieved_user:null
                }
            }
        }

        return {
            status:"OK",
            statusCode:200,
            message:"user retrieved",
            data: {
                retrieved_user:user
            }
        }

    } catch (error) {
        return {
            status:"INTERNAL_SERVICE_ERROR",
            statusCode:500,
            message:err,
            data: {
                created_user:null
            }
        }
    }
}
module.exports = {createUser,getUser,userLogin,userGetProfile}