"use strict";
const { Model } = require("sequelize");
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
        foreignKey: "gameId",
        onDelete: "CASCADE",
      });

      Game.hasOne(models.Community, {
        foreignKey: "gameId",
        onDelete: "CASCADE",
      });
    }
  }
  Game.init(
    {
      title: DataTypes.STRING,
      price: DataTypes.FLOAT,
      shortDescription: DataTypes.TEXT,
      detailedDescription: DataTypes.TEXT,
      headerImage: DataTypes.TEXT,
      capsuleImage: DataTypes.TEXT,
      website: DataTypes.STRING,
      requirements: DataTypes.JSONB,
      legal: DataTypes.TEXT,
      genres: DataTypes.JSONB,
      developers: DataTypes.JSONB,
      publishers: DataTypes.JSONB,
      screenshots: DataTypes.JSONB,
      movies: DataTypes.JSONB,
      releaseDate: DataTypes.STRING,
      background: DataTypes.TEXT,
      ESRBRating: DataTypes.JSONB,
      categories: DataTypes.JSONB,
    },
    {
      sequelize,
      modelName: "Game",
    }
  );
  return Game;
};
