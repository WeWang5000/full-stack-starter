'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MusicWebsite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MusicWebsite.init(
    {
      Name: DataTypes.STRING,
      Created: DataTypes.STRING,
      Pictures: DataTypes.STRING,
      Audio: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'MusicWebsite',
    }
  );
  return MusicWebsite;
};
