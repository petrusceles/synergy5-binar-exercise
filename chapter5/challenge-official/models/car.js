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
      Car.belongsTo(models.User, {foreignKey:'created_by', as:'created_by'});
      Car.belongsTo(models.User, {foreignKey:'updated_by', as:'updated_by'});
      Car.belongsTo(models.User, {foreignKey:'deleted_by', as:'deleted_by'});
      Car.belongsTo(models.CarSize, {foreignKey:'size_id', as:'size'});
    }
  }
  Car.init({
    name: DataTypes.STRING,
    price: DataTypes.BIGINT,
    size_id: DataTypes.INTEGER,
    is_available: DataTypes.BOOLEAN,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER,
    deleted_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};