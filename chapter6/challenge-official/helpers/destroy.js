const { Car, User } = require("../models");

module.exports = {
  user: (id) => {
    console.log("Delete 1 User");
    return User.destroy({
      where: {
        id,
      },
    });
  },
};
