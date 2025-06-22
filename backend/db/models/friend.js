'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Friend.belongsTo(models.User, {
        as: 'Sender',
        foreignKey: 'senderId',
      });

      Friend.belongsTo(models.User, {
        as: 'Receiver',
        foreignKey: 'receiverId'
      });
    }
  }
  Friend.init({
    senderId: DataTypes.INTEGER,
    recieverId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Friend',
  });
  return Friend;
};