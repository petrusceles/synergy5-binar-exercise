const userServices = require('../services/userServices');
module.exports = {
    create: async (req,res) => {
        const {name, email, password,address} = req.body;
        const {status,statusCode,message,data} = await userServices.createUser({name,email,password,address});
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
        const {status,statusCode, message, data} = await userServices.userGetProfile({id,email})
        res.status(statusCode).json({
            status,message,data
        })
    },
    update: async (req,res) => {
        try {
            const {name,email,password,address} = req.body;
            const {id} = req.params
            if (!name && !email && !password && !address) {
                return res.status(200).json({
                    message:"no data updated"
                })
            }
    
            const user = await User.findByPk(id)

            await user.update({
                name,email,password,address
            })
            return res.status(200).json({
                user
            })
        } catch (err) {
            res.status(500).json({
                data:err
            })
        }
    },
    delete: async (req,res) => {
        try {
            const {id} = req.params
            const deleted = await User.destroy({
                where: {
                    id
                }
            })
            if (!deleted) {
                return res.status(404).json({
                    message:"no data deleted"
                })
            }
            return res.status(200).json({
                data:deleted
            })
        } catch (err) {
            res.status(500).json({
                data:err
            })
        }
    }
}