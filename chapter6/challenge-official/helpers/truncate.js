const { Car, User } = require("../models");

module.exports = {
  car: () => {
    console.log("Truncate Car");
    return Car.destroy({ truncate: true, restartIdentity: true });
  }
};
