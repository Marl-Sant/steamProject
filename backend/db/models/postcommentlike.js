'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostCommentLike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PostCommentLike.belongsTo(models.User, {
        foreignKey: 'ownerId'
      });

      PostCommentLike.belongsTo(models.PostComment, {
        foreignKey: 'postCommentId'
      });
    }
  }
  PostCommentLike.init({
    ownerId: DataTypes.INTEGER,
    postCommentId: DataTypes.INTEGER,
    liked: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'PostCommentLike',
  });
  return PostCommentLike;
};