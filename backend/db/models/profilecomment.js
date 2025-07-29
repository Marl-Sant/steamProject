'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProfileComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User who made the comment
      ProfileComment.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'commenter'
      });
    
      // User whose profile received the comment
      ProfileComment.belongsTo(models.User, {
        foreignKey: 'profileUserId',
        as: 'profileOwner'
      });
    }
  }
  ProfileComment.init({
    userId: DataTypes.INTEGER,
    profileUserId: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ProfileComment',
  });
  return ProfileComment;
};