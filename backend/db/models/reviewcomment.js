"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ReviewComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ReviewComment.belongsTo(models.User, {
        foreignKey: "userId",
      });

      ReviewComment.belongsTo(models.Review, {
        foreignKey: "reviewId",
        onDelete: "CASCADE",
      });
    }
  }
  ReviewComment.init(
    {
      userId: DataTypes.INTEGER,
      reviewId: DataTypes.INTEGER,
      comment: DataTypes.STRING,
      isHelpful: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "ReviewComment",
    }
  );
  return ReviewComment;
};
