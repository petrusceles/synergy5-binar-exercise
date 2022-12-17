const Validator = require("fastest-validator");
const v = new Validator();

const userRegisterSchema = {
  name: { type: "string", min: 2, max: 255 },
  email: { type: "email" },
  password: { type: "string", min: 8, max: 255 },
  roleId: { type: "number", positive: true, integer: true },
};

const userRegisterCheck = v.compile(userRegisterSchema);

const userLoginSchema = {
  email: { type: "email" },
  password: { type: "string", min: 8, max: 255 },
};

const userLoginCheck = v.compile(userLoginSchema);

module.exports = {
  userRegisterCheck,
  userLoginCheck,
};
