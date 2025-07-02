'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Games',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        title: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        price: {
          allowNull: false,
          type: Sequelize.FLOAT,
        },
        shortDescription: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        detailedDescription: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        headerImage: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        capsuleImage: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        website: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        requirements: {
          allowNull: false,
          type: Sequelize.JSONB,
        },
        legal: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        genres: {
          allowNull: false,
          type: Sequelize.JSONB,
        },
        developers: {
          allowNull: false,
          type: Sequelize.JSONB,
        },
        publishers: {
          allowNull: false,
          type: Sequelize.JSONB,
        },
        screenshots: {
          allowNull: false,
          type: Sequelize.JSONB,
        },
        movies: {
          allowNull: false,
          type: Sequelize.JSONB,
        },
        releaseDate: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        background: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        ESRBRating: {
          type: Sequelize.JSONB,
        },
        categories: {
          allowNull: false,
          type: Sequelize.JSONB,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      options
    );
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Games';
    return queryInterface.dropTable(options);
  },
};
