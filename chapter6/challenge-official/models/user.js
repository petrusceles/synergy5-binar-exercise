'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Car, {foreignKey:'created_id', as:'createdBy'})
      User.hasMany(models.Car, {foreignKey:'updated_id', as:'updatedBy'})
      User.hasMany(models.Car, {foreignKey:'deleted_id', as:'deletedBy'})
      User.belongsTo(models.Role,{foreignKey:"role_id", as:"role"})
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};