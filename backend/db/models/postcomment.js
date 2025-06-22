'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PostComment.belongsTo(models.User, {
        foreignKey: 'ownerId'
      });

      PostComment.belongsTo(models.Post, {
        foreignKey: 'postId'
      });

      PostComment.hasMany(models.PostCommentLike, {
        foreignKey: 'postCommentId'
      })
    }
  }
  PostComment.init({
    ownerId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PostComment',
  });
  return PostComment;
};