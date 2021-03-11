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
    }
  };
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING,
    dob: DataTypes.DATE,
    address: DataTypes.STRING,
    description: DataTypes.STRING,
    createdAt: DataTypes.DATE,
  }, {
    timestamps: true,
    updatedAt: false,
    sequelize,
    modelName: 'User',
  });
  return User;
};