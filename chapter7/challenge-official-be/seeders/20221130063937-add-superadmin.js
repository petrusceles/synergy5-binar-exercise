"use strict";

/** @type {import('sequelize-cli').Migration} */
require("dotenv").config();
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const encryptedPassword = await bcrypt.hash(
      process.env.SUPER_ADMIN_PASSWORD,
      parseInt(process.env.SALT_ROUND)
    );
    await queryInterface.bulkInsert("Users", [
      {
        name: "Super Admin",
        email: "superadmin@mail.com",
        password: encryptedPassword,
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
