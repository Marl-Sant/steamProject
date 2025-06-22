'use strict';

const { Model, Validator } = require('sequelize');
const review = require('./review');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(models.Review, {
        foreignKey: "userId"
      });

      User.hasMany(models.Friend, {
        foreignKey: "senderId",
        as: "SentFriendRequests"
      });

      User.hasMany(models.Friend, {
        foreignKey: "recieverId",
        as: "ReceivedFriendRequests"
      });

      User.hasMany(models.ReviewLike, {
        foreignKey: "ownerId"
      });

      User.hasMany(models.Post, {
        foreignKey: 'ownerId'
      });

      User.hasMany(models.PostComment, {
        foreignKey: 'ownerId'
      });

      User.hasMany(models.CommunityLike, {
        foreignKey: 'ownerId'
      });

      User.hasMany(models.PostCommentLike, {
        foreignKey: 'ownerId'
      });

      User.hasMany(models.PostLike, {
        foreignKey: 'ownerId'
      });
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error('Cannot be an email.');
            }
          },
        },
      },
      firstName:{
        type: DataTypes.STRING,
        validate: {
          len: [2, 30]
        }
      },
      lastName:{
        type: DataTypes.STRING,
        validate: {
          len: [2, 30]
        }
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false
      },
      profilePic:{
        type: DataTypes.STRING
      },
      bio: {
        type: DataTypes.TEXT
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 256],
          isEmail: true,
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
        },
      },
    }
  );
  return User;
};
