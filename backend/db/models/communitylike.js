"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CommunityLike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CommunityLike.belongsTo(models.User, {
        foreignKey: "userId",
      });

      CommunityLike.belongsTo(models.Community, {
        foreignKey: "communityId",
      });
    }
  }
  CommunityLike.init(
    {
      userId: DataTypes.INTEGER,
      communityId: DataTypes.INTEGER,
      liked: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "CommunityLike",
    }
  );
  return CommunityLike;
};
