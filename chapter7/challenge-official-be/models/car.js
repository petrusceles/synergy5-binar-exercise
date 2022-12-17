"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Car.belongsTo(models.User, {
        foreignKey: "createdBy",
        as: "createdByUser",
      });
      Car.belongsTo(models.User, {
        foreignKey: "updatedBy",
        as: "updatedByUser",
      });
      Car.belongsTo(models.User, {
        foreignKey: "deletedBy",
        as: "deletedByUser",
      });
    }
  }
  Car.init(
    {
      plate: DataTypes.STRING,
      manufacture: DataTypes.STRING,
      model: DataTypes.STRING,
      pictureUrl: DataTypes.STRING,
      price: DataTypes.BIGINT,
      capacity: DataTypes.BIGINT,
      description: DataTypes.STRING,
      transmission: DataTypes.STRING,
      type: DataTypes.STRING,
      year: DataTypes.STRING,
      options: DataTypes.ARRAY(DataTypes.STRING),
      specs: DataTypes.ARRAY(DataTypes.STRING),
      availableAt: DataTypes.STRING,
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
      deletedBy: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Car",
    }
  );
  return Car;
};
