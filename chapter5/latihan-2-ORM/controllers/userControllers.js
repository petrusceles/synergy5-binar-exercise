const userServices = require('../services/userServices');
module.exports = {
    create: async (req,res) => {
        const {name, email, password,address} = req.body;
        const {status,statusCode,message,data} = await userServices.createUser({name,email,password,address});
        console.log(message)
        res.status(statusCode).json({
            status,message,data
        })
    },
    read: async (req,res) => {
        const {status,statusCode,message,data} = await userServices.getUser(req.query)
        res.status(statusCode).json({
            status,message,data
        })
    },
    readProfile: async (req,res) => {
        const {id} = req.params;
        const email = req.email;
        const {status,statusCode, message, data} = await userServices.userGetProfile({reqId:id,email})
        res.status(statusCode).json({
            status,message,data
        })
    },
    login: async (req,res) => {
        const {email, password} = req.body;
        const {status,statusCode, message, data} = await userServices.userLogin({email,password})
        res.status(statusCode).json({
            status,message,data
        })
    }
}