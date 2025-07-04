"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GameImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GameImage.belongsTo(models.Game, {
        foreignKey: "gameId",
      });
    }
  }
  GameImage.init(
    {
      gameId: DataTypes.INTEGER,
      url: DataTypes.STRING,
      displayPic: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "GameImage",
    }
  );
  return GameImage;
};
