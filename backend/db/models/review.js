"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, {
        foreignKey: "userId",
      });

      Review.belongsTo(models.Game, {
        foreignKey: "gameId",
      });

      Review.hasMany(models.ReviewLike, {
        foreignKey: "reviewId",
      });
    }
  }
  Review.init(
    {
      review: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [10, 1000],
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      gameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isRecommended: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
