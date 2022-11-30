const Validator = require("fastest-validators");
const v = new Validator();

const userRegisterSchema = {
    name: {type: "string", min:2, max:255},
    email: {type: "email"},
    password: {type: "string", min:8, max:255},
    role:{type: "integer"}
}

const userRegisterCheck = v.compile(userRegisterSchema);

const userLoginSchema = {
    email:{type:"email"},
    password: {type: "string", min:8, max:255}
}

const userLoginCheck = v.compile(userLoginSchema);


module.exports = {
    userRegisterCheck,userLoginCheck
}