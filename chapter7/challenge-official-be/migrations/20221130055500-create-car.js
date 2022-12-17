"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Cars", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      plate: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      manufacture: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      model: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      pictureUrl: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      price: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      capacity: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      transmission: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      year: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      options: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      specs: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      availableAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdBy: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      updatedBy: {
        type: Sequelize.INTEGER,
      },
      deletedBy: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Cars");
  },
};
