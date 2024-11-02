'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cars.belongsTo(models.users, {
        foreignKey: 'createdBy',
        as: 'createdByUser'
      });

      cars.belongsTo(models.users, {
        foreignKey: 'updatedBy',
        as: 'updatedByUser'
      });
    }
  }
  cars.init({
    name: DataTypes.STRING,
    model: DataTypes.STRING,
    desc: DataTypes.TEXT,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    deletedBy: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    paranoid: true,
    modelName: 'cars',
  });
  return cars;
};