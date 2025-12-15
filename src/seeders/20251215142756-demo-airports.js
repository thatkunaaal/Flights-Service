"use strict";

const { Op } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
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

    await queryInterface.bulkInsert("Airports", [
      {
        name: "Chhatrapati Shivaji Maharaj International Airport",
        code: "BOM",
        address: `Chhatrapati Shivaji Maharaj International Airport, Andheri East, Mumbai, Maharashtra – 400099, India`,
        cityId: 1,
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
    await queryInterface.bulkDelete("Airports", {
      code: {
        [Op.in]: ["BOM"],
      },
    });
  },
};
