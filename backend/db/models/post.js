"use strict";
const { Model } = require("sequelize");
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
        foreignKey: "userId",
      });

      Post.belongsTo(models.Community, {
        foreignKey: "communityId",
      });

      Post.hasMany(models.PostLike, {
        foreignKey: "postId",
        onDelete: "CASCADE",
      });
    }
  }
  Post.init(
    {
      userId: DataTypes.INTEGER,
      communityId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      post: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
