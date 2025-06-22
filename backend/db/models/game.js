'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Game.hasMany(models.Review, {
        foreignKey: "gameId"
      });

      Game.hasMany(models.GameImage, {
        foreignKey: "gameId"
      })
    }
  }
  Game.init({
    title: DataTypes.STRING,
    price: DataTypes.FLOAT,
    description: DataTypes.STRING,
    genre: DataTypes.STRING,                                  
    developer: DataTypes.STRING,
    publisher: DataTypes.STRING,
    mainImage: DataTypes.STRING,
    subImages: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};
