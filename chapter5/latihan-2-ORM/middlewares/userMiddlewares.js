const jwt = require('jsonwebtoken');
module.exports = {
    tokenAccess: async (req,res) => {
        try {
            const {email} = jwt.verify(req.Authorization,process.env.JWT_SECRET)
            req.email = email;
            next();
        } catch (err) {
            if (err instanceof jwt.JsonWebTokenError) {
                return res.status(401).json({
                    status:"UNAUTHORIZED",
                    message:err,
                    data:null
                })
            }
            return res.status(500).json({
                status:"INTERNAL_SERVER_ERROR",
                message:err,
                data:null
            })
        }
    }
}