"use strict";

/** @type {import('sequelize-cli').Migration} */
const { users } = require('../models');

module.exports = {
    async up(queryInterface, Sequelize) {
        const usersData = [
            {
                name: "Super Admin",
                email: "super.admin@example.com",
                password: "superadmin",
                role: "superadmin"
            },
            {
                name: "Admin",
                email: "admin@example.com",
                password: "admin",
                role: "admin"
            },
            {
                name: "User",
                email: "user@example.com",
                password: "user",
                role: "user"
            }
        ];

        for (const userData of usersData) {
            await users.create({
                ...userData,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
