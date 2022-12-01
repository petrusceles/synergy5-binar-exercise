const jwt = require('jsonwebtoken');
const {ROLES} = require('../lib/const');
const checkToken = (req,res,next) => {
    try {
        const bearer = req.headers.authorization;
        if (!bearer) {
            return res.status(401).json({
                status:"UNAUTHORIZED",
                message:"no bearer provided",
                data:null
            })
        }
        const token = bearer.split(' ')[1]
        const {email, role_id, id} = jwt.verify(token,process.env.JWT_SECRET)
        req.user = {email, role_id, id};
        next();
    } catch (err) {
        console.log(err)
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

const superAdminAuth = (req,res,next) => {
    if (req.user.role_id !== ROLES.SUPER_ADMIN) {
        return res.status(401).json({
            status:"UNAUTHORIZED",
            message:"only super admin can access",
            data:null
        })
    }
    next();
}

const adminAuth = (req,res,next) => {
    if (req.user.role_id !== ROLES.ADMIN && req.user.role_id !== ROLES.SUPER_ADMIN) {
        return res.status(401).json({
            status:"UNAUTHORIZED",
            message:"only admin or superadmin can access",
            data:null
        })
    }
    next();
}

module.exports = {
    checkToken,superAdminAuth,adminAuth
}