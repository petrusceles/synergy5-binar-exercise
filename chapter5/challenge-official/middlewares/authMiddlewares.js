const jwt = require('jsonwebtoken');
const checkToken = (req,res,next) => {
    try {
        const bearer = req.headers.authorization;
        const token = bearer.split(' ')[1]
        const {email,role} = jwt.verify(token,process.env.JWT_SECRET)
        req.user = {email,role};
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

module.exports = {
    checkToken
}