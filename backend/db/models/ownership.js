"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ownership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ownership.belongsTo(models.User, {
        foreignKey: "ownerId",
      });

      Ownership.belongsTo(models.Game, {
        foreignKey: "gameId",
      });
    }
  }
  Ownership.init(
    {
      ownderId: DataTypes.INTEGER,
      gameId: DataTypes.INTEGER,
      mostRecent: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Ownership",
    }
  );
  return Ownership;
};
