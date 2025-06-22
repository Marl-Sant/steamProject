'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {
        foreignKey: 'ownerId'
      });

      Post.belongsTo(models.Community, {
        foreignKey: 'communityId'
      });

      Post.hasMany(models.PostComment, {
        foreignKey: 'postId'
      });

      Post.hasMany(models.PostLike, {
        foreignKey: 'postId'
      });
    }
  }
  Post.init({
    ownerId: DataTypes.INTEGER,
    communityId: DataTypes.INTEGER,
    post: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};