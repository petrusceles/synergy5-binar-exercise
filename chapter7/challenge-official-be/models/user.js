"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Car, {
        foreignKey: "createdBy",
        as: "createdByUser",
      });
      User.hasMany(models.Car, {
        foreignKey: "updatedBy",
        as: "updatedByUser",
      });
      User.hasMany(models.Car, {
        foreignKey: "deletedBy",
        as: "deletedByUser",
      });
      User.belongsTo(models.Role, { foreignKey: "roleId", as: "role" });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
