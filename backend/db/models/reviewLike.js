'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReviewLike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ReviewLike.belongsTo(models.User, {
        foreignKey: 'ownerId',
      });

      ReviewLike.belongsTo(models.Review, {
        foreignKey: 'reviewId',
      });
    }
  }
  ReviewLike.init({
    ownerId: DataTypes.INTEGER,
    reviewId: DataTypes.INTEGER,
    liked: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ReviewLike',
  });
  return ReviewLike;
};
