'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Car.belongsTo(models.User, {foreignKey:'created_id', as:'createdBy'});
      Car.belongsTo(models.User, {foreignKey:'updated_id', as:'updatedBy'});
      Car.belongsTo(models.User, {foreignKey:'deleted_id', as:'deletedBy'});
    }
  }
  Car.init({
    name: DataTypes.STRING,
    price: DataTypes.BIGINT,
    size: DataTypes.STRING,
    picture_url: DataTypes.STRING,
    created_id: DataTypes.INTEGER,
    updated_id: DataTypes.INTEGER,
    deleted_id: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};