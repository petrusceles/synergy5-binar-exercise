const authServices = require('../services/authServices');

const userRegister = async (req,res) => {
    const {name,email,password,role} = req.body;
    const {status,statusCode,message,data} = await authServices.userRegisterService({name,email,password,role});
    return res.status(statusCode).json({
        status,message,data
    });
}

const userLogin = async (req,res) => {
    const {email, password} = req.body;
    const {status,statusCode,message,data} = await authServices.userLoginService({email,password});
    return res.status(statusCode).json({
        status,message,data
    });
}

module.exports = {
    userRegister,userLogin
}